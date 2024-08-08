import { Product as MedusaProduct } from '@medusajs/medusa'
import { Entity, OneToMany } from 'typeorm';
import { ProductReview } from './product-review';

@Entity()
export class Product extends MedusaProduct {
  @OneToMany(() => ProductReview, (productReview) => productReview.product)
  reviews: ProductReview[]
}
