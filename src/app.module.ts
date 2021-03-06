import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountsModule } from './accounts/accounts.module';
import { User } from './accounts/models/User.model';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { AdminModule } from './admin/admin.module';
import { Product } from './products/models/Product.model';
import { Category } from './products/models/Category.model';
import { ProductCategory } from './products/models/ProductCategory.model';
import { Cart } from './accounts/models/Cart.model';
import { ProductCondition } from './products/models/ProductCondition.model';
import { Condition } from './products/models/Condition.model';
import { Brand } from './products/models/Brand.model';
import { BrandCategory } from './products/models/BrandCategory';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [
        User,
        Product,
        Category,
        ProductCategory,
        Condition,
        ProductCondition,
        Cart,
        Brand,
        BrandCategory,
      ],
      autoLoadModels: true,
      synchronize: true,
    }),
    AccountsModule,
    ProductsModule,
    AdminModule,
  ],
})
export class AppModule {}
