import {
  IsArray,
  IsDate,
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  MinDate,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNumberString()
  price: number;

  currency: string;

  @IsNumberString()
  quantityRemaining: number;

  @IsNumberString()
  quantitySupplied: number;

  @IsOptional()
  @IsNumberString()
  discount: number | null;

  @IsOptional()
  @IsDate()
  @MinDate(new Date())
  expDate: Date;

  @IsNotEmpty()
  description: string;

  @IsIn(['medicine', 'vitamin'])
  type: string;

  @IsOptional()
  categories: string | string[];

  @IsNotEmpty()
  brandId: string;

  images: string | string[];
}
