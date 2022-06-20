import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from './Product.model';
import { ProductCategory } from './ProductCategory.model';

@Table({
  timestamps: false
})
export class Category extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ type: DataType.ENUM('medicine', 'vitamin'), allowNull: false })
  type: string;

  @BelongsToMany(() => Product, () => ProductCategory)
  products: Product[];
}
