import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindAndCountOptions, WhereOptions } from 'sequelize/types';
import { Brand } from './models/Brand.model';
import { Category } from './models/Category.model';
import { Product } from './models/Product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private readonly product: typeof Product,
  ) {}

  getConditions() {
    return [
      {
        name: 'Illness 1',
        icon: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-illness-lifestyles-flaticons-lineal-color-flat-icons-2.png',
      },
      {
        name: 'Illness 2',
        icon: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-illness-lifestyles-flaticons-lineal-color-flat-icons-2.png',
      },
      {
        name: 'Illness 3',
        icon: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-illness-lifestyles-flaticons-lineal-color-flat-icons-2.png',
      },
      {
        name: 'Illness 4',
        icon: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-illness-lifestyles-flaticons-lineal-color-flat-icons-2.png',
      },
      {
        name: 'Illness 5',
        icon: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-illness-lifestyles-flaticons-lineal-color-flat-icons-2.png',
      },
      {
        name: 'Illness 6',
        icon: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-illness-lifestyles-flaticons-lineal-color-flat-icons-2.png',
      },
      {
        name: 'Illness 7',
        icon: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-illness-lifestyles-flaticons-lineal-color-flat-icons-2.png',
      },
      {
        name: 'Illness 8',
        icon: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-illness-lifestyles-flaticons-lineal-color-flat-icons-2.png',
      },
      {
        name: 'Illness 9',
        icon: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-illness-lifestyles-flaticons-lineal-color-flat-icons-2.png',
      },
    ];
  }

  async getProduct(params: WhereOptions): Promise<Product> {
    return await this.product.findOne({
      include: [Category, Brand],
      where: params,
    });
  }

  async getProducts(params: FindAndCountOptions = {}): Promise<{
    rows: Product[];
    count: number;
  }> {
    const query = {
      limit: 6,
      offset: 0,
      include: [Category, Brand],
      ...params,
    };
    return await this.product.findAndCountAll(query);
  }
}
