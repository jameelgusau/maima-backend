import { IsIn, IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    name: string;

    @IsIn(['medicine', 'vitamin'])
    type: string;
}
