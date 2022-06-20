import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { BrandCategory } from './BrandCategory';
import { Category } from './Category.model';

@Table({
  timestamps: false
})
export class Brand extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  logo: string;

  @BelongsToMany(() => Category, () => BrandCategory)
  categories: Category[];
}
