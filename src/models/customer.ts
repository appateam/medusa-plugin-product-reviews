import { Customer as MedusaCustomer } from '@medusajs/medusa'
import { Entity, OneToMany } from 'typeorm';
import { ProductReview } from './product-review';

@Entity()
export class Customer extends MedusaCustomer {
  @OneToMany(() => ProductReview, (productReview) => productReview.author)
  reviews: ProductReview[]
}
