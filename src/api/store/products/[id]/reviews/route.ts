import { MedusaRequest, MedusaResponse } from '@medusajs/medusa';
import ProductReviewService from '../../../../../services/product-review';
import { ProductReview } from '../../../../../models/product-review';

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const productReviewService: ProductReviewService = req.scope.resolve(
    "productReviewService"
  )

  const { reviews, count, averageRating } = await productReviewService.listForProduct(
    req.params.id,
    {},
    { relations: ['author'] }
  )

  res.json({
    reviews,
    count,
    averageRating
  })
}

interface StorePostReviewReq {
  rating: number;
  title: string | null;
  description: string | null;
  author: string | null;
}

export const POST = async (
  req: MedusaRequest<StorePostReviewReq>,
  res: MedusaResponse<ProductReview>
) => {
  const productReviewService: ProductReviewService = req.scope.resolve(
    "productReviewService"
  )

  const review = await productReviewService.create({
    product_id: req.params.id,
    author_id: req.user.customer_id,
    rating: req.body.rating,
    title: req.body.title,
    description: req.body.description,
    pseudonym: req.body.author,
  })

  res.json(review);
}
