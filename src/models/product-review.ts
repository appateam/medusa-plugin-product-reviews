import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne, Unique,
} from "typeorm"
import { SoftDeletableEntity } from "@medusajs/medusa"
import { generateEntityId } from "@medusajs/medusa/dist/utils"
import { Product } from './product';
import { Customer } from './customer';

@Entity()
@Unique(['product_id', 'author_id'])
export class ProductReview extends SoftDeletableEntity {
  @Column({ type: "varchar" })
  product_id: string

  @ManyToOne(() => Product, (product) => product.reviews)
  @JoinColumn({ name: "product_id" })
  product: Product

  @Column({ type: "varchar" })
  author_id: string

  @ManyToOne(() => Customer, (customer) => customer.reviews)
  @JoinColumn({ name: "author_id" })
  author: Customer

  @Column({ type: "smallint" })
  rating: number

  @Column({ type: "varchar" })
  title: string | null

  @Column({ type: "varchar" })
  description: string | null

  @Column({ type: "varchar" })
  pseudonym: string | null;

  @Column({ type: "timestamptz" })
  approved_at: Date | null;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "prodreview")
  }
}
