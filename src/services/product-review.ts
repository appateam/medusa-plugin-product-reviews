import { buildQuery, FindConfig, TransactionBaseService } from '@medusajs/medusa';
import { ProductReview } from '../models/product-review';
import { IsNull, Not } from 'typeorm';

class ProductReviewService extends TransactionBaseService {

  constructor(container) {
    super(container)
  }

  /**
   * Lists customer product reviews based on the provided parameters.
   * @param selector - an object that defines rules to filter customer product reviews
   *   by
   * @param config - object that defines the scope for what should be
   *   returned
   * @return the result of the find operation
   */
  async list(
    selector = {},
    config: FindConfig<ProductReview> = {
      relations: [],
      skip: 0,
      take: 20,
    }
  ) {
    return this.atomicPhase_(async (manager) => {
      const repository = manager.getRepository(ProductReview)
      const query = buildQuery(selector, config)
      return await repository.find(query)
    })
  }

  /**
   * Lists customer product reviews based on the provided parameters
   * @param productId The product ID to retrieve customer reviews for
   * @param onlyWithDescription Only retrieve documents with description
   * @param selector - an object that defines rules to filter customer product reviews
   *   by
   * @param config - object that defines the scope for what should be
   *   returned
   * @return the result of the find operation
   */
  async listForProduct(
    productId: string,
    selector = {},
    config: FindConfig<ProductReview> = {
      relations: [],
      skip: 0,
      take: 20,
    }
  ) {
    return this.atomicPhase_(async (manager) => {
      const repository = manager.getRepository(ProductReview)
      const query = buildQuery(selector, config)
      const reviews = await repository.find({
        ...query,
        where: {
          product_id: productId,
        }
      })
      const count = await repository.count({
        ...query,
        where: {
          product_id: productId
        }
      });
      const averageRating = await repository.average('rating', {
        ...query.where,
        product_id: productId
      })
      return {
        reviews,
        count,
        averageRating
      }
    })
  }

  /**
   * Return the total number of documents in database
   * @param {object} selector - the selector to choose customer product reviews by
   * @return {Promise} the result of the count operation
   */
  async count(selector = {}) {
    return this.atomicPhase_(async (manager) => {
      const repository = manager.getRepository(ProductReview)
      const query = buildQuery(selector)
      return await repository.count(query)
    })
  }

  async averageRating(selector = {}) {
    return this.atomicPhase_(async (manager) => {
      const repository = manager.getRepository(ProductReview)
      const query = buildQuery(selector)
      return await repository.average('rating', query.where)
    });
  }

  /**
   * Gets a customer product review by product_id.
   * Throws in case of DB Error and if customer product reviews was not found.
   * @param productId - id of the product to get.
   * @return the result of the find one operation.
   */
  async retrieve(productId) {
    const repository = this.manager_.getRepository(ProductReview)
    return await repository.findOne({ where: { product_id: productId } })
  }

  /**
   * Gets a customer product review by author_id.
   * Throws in case of DB Error and if customer product reviews was not found.
   * @param authorId - id of the user to get.
   * @return the result of the find one operation.
   */
  async retrieveByAuthorId(authorId) {
    const repository = this.manager_.getRepository(ProductReview)
    return await repository.findOne({ where: { author_id: authorId } })
  }

  /**
   * Creates a product review.
   * @param data - the product review to create
   * @return resolves to the creation result.
   */
  async create(
    data: Pick<ProductReview, "product_id" | "author_id" | "rating" | "title" | "description" | "pseudonym">
  ) {
    return this.atomicPhase_(async (manager) => {
      const repository = manager.getRepository(ProductReview)

      const { ...rest } = data

      try {
        const productReview = repository.create(rest)
        return await repository.save(productReview)
      } catch (error) {
        console.log(error)
      }
    })
  }
}

export default ProductReviewService
