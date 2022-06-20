import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from "../accounts/guards/jwt-auth.guard";
import { createReadStream } from 'fs';
import { join } from 'path';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Observable } from 'rxjs';
import { AdminService } from './admin.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard,RolesGuard )
  @Post('categories')
  async addCategory(@Body() body: CreateCategoryDto) {
    try {
      const category = await this.adminService.addCategory(body);
      return category;
    } catch (error) {
      throw error;
    //    new HttpException(
    //     {
    //       status: 'error',
    //       error: error.message,
    //     },
    //     HttpStatus.FORBIDDEN,
    //   );
   }
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard,RolesGuard )
  @Put('categories')
  async updateCategory(@Body() body: UpdateCategoryDto) {
    try {
      const category = await this.adminService.updateCategory(body);
      return category;
    } catch (error) {
      throw error
      // new HttpException(
      //   {
      //     status: 'error',
      //     error: error.message,
      //   },
      //   HttpStatus.FORBIDDEN,
      // );
    }
  }

  // NB - Remember to add validation to check that the categories exist
  @Post('product')
  @UseInterceptors(
    FilesInterceptor('images', 6, {
      storage: diskStorage({
        destination: './uploads/products',
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${name}-${randomName}${fileExtName}`);
        },
      }),
    }),
  )

  async addProduct(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: CreateProductDto,
  ) {
    if (files) body.images = files.map((file) => file.path);
    try {
      const product = await this.adminService.addProduct(body);
      return { status: 'success', message: 'Product added', data: product };
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          error: error.message,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Get('product')
  async getProducts() {
    try {
      const products = await this.adminService.getProducts();
      return { status: 'success', message: 'Products fetched', data: products };
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          error: error.message,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Post('brands')
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: './uploads/brands',
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${name}-${randomName}${fileExtName}`);
        },
      }),
    }),
  )

  async addBrand(
    @Body() body: CreateBrandDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      if (file) {
        const { buffer, ...rest } = file;
        body.logo = rest.filename;
      }
      const brand = await this.adminService.addBrand(body);
      return { status: 'success', message: 'Brand Added', data: brand };
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          error: error.message,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

//get single brand
  @Get('brand/:id')
  async getBrand(@Param('id') id) {
    try {
      const products = await this.adminService.getBrand(id);
      return { status: 'success', message: 'Products fetched', data: products };
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          error: error.message,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
  
//display brand on the frontend
  @Get('band/image/:id')
  getFile(@Param('id') id, @Res() res) {
    const file = createReadStream(join(process.cwd(), 'uploads/brands/' + id));
    file.pipe(res);
  }

}
