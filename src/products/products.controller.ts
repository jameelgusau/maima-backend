import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query
} from '@nestjs/common';
import sequelize from 'sequelize';
import { WhereOptions } from 'sequelize';
import { FindAndCountOptions } from 'sequelize/types';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('conditions')
  getConditions() {
    try {
      const condition = this.productsService.getConditions();
      return {
        status: 'success',
        message: 'Conditions fetched successfully',
        data: condition,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: error.message,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Get(':id')
  async getProduct(@Param() id) {
    try {
      const product = await this.productsService.getProduct(id);
      return product;
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: error.message,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Get()
  async getProducts(@Query() query) {
    let { limit, page, ...rest } = query;
    const where: WhereOptions = {};
    page = query.page || 1;
    const params = {} as FindAndCountOptions;
    params.limit = Number(query.limit) || 6;
    params.offset = page === 1 ? 0 : (query.page - 1) * 6;
    if (query.name) {
      where.name = sequelize.where(
        sequelize.fn('LOWER', sequelize.col('name')),
        'LIKE',
        '%' + query.name + '%',
      );
    }
    params.where = where;
    try {
      const products = await this.productsService.getProducts(params);
      return products;
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: error.message,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
