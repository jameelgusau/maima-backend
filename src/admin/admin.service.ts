import { 
  Injectable,   
  HttpException,
  HttpStatus
 } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Brand } from 'src/products/models/Brand.model';
import { Category } from 'src/products/models/Category.model';
import { WhereOptions } from 'sequelize/types';
import { Product } from 'src/products/models/Product.model';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Category)
    private readonly productCategory: typeof Category,
    @InjectModel(Product) private readonly productModel: typeof Product,
    @InjectModel(Brand) private readonly brandModel: typeof Brand,
  ) {}
  async getCategories(): Promise<Category[]> {
    return await this.productCategory.findAll();
  }

  async createCategory(category): Promise<Category> {
    return await this.productCategory.create(category);
  }

  async addCategory(category): Promise<any> {
    const findOne = await this.productCategory.findOne({ where:{name:category.name}});
    if(findOne){
      // console.log(findOne)
      throw new HttpException(
        {
          status: 'error',
          error: "Category already exists",
        },
        HttpStatus.FORBIDDEN,
      );
    }
   const cat =  await this.createCategory(category);
    return  { status: 'success', message: 'Category added', data: cat };
  }

  async updateCategory(category): Promise<any> {
    const findOne = await this.productCategory.findByPk(category.id);
    if(!findOne){
      // console.log(findOne, "1")
      throw new HttpException(
        {
          status: 'error',
          error: "Category not found",
        },
        HttpStatus.NOT_FOUND,
      );
    };
  if(category.name && findOne.name !== category.name && await this.productCategory.findOne({ where: { name: category.name } })){
    throw new HttpException(
      {
        status: 'error',
        error: "Category with same name already registered",
      },
      HttpStatus.FORBIDDEN,
    );
  };
  await this.productCategory.update(category, { where: {id: category.id}});
    return  { status: 'success', message: 'Category upadated'};
  }
  async getProducts(): Promise<Product[]> {
    return await this.productModel.findAll({ include: [Category, Brand] });
  }

  async getBrand(params: WhereOptions): Promise<Brand> {
    return await this.brandModel.findOne({
      where:{ id: params}
    });
  }
  async addProduct(product): Promise<Product> {
    const data = await this.productModel.create(product);
    if (product.categories) {
      data.$add('categories', product.categories);
    }
    return data;
  }

  async addBrand(brand): Promise<Brand> {
    const data = await this.brandModel.create(brand);
    if (brand.categories) {
      data.$add('categories', brand.categories);
    }
    return data;
  }
}
