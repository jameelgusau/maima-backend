import { IsIn, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsIn(['medicine', 'vitamin'])
  type: string;
}
