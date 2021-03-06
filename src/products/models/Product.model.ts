import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Brand } from './Brand.model';
import { Category } from './Category.model';
import { Condition } from './Condition.model';
import { ProductCategory } from './ProductCategory.model';
import { ProductCondition } from './ProductCondition.model';

@Table({
  timestamps: false
})
export class Product extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  price: number;

  @Column({ defaultValue: 'ngn' })
  currency: string;

  @Column({ allowNull: false })
  quantityRemaining: number;

  @Column({ allowNull: false })
  quantitySupplied: number;

  @Column({ defaultValue: 0 })
  discount: number;

  @Column
  expDate: Date;

  @Column({ type: DataType.ENUM('paper box', 'sachet') })
  packagingType: string;

  @Column
  description: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
  })
  images: string[];

  @BelongsToMany(() => Category, () => ProductCategory)
  categories: Category[];

  @BelongsToMany(() => Condition, () => ProductCondition)
  conditions: Condition[];

  @BelongsTo(() => Brand, 'brandId')
  brand: Brand;
}
