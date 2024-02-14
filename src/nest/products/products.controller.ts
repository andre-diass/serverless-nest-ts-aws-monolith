import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { CreateProduct } from '../../application/usecases/product/CreateProduct';
import { RepositoriesFactory } from '../../infra/factories/RepositoriesFactory';
import { GetProduct } from '../../application/usecases/product/GetProduct';

@Controller('products')
export class ProductsController {
  @Post()
  @HttpCode(201)
  async create_product(@Body() body: any) {
    const create_product = new CreateProduct(new RepositoriesFactory());
    const product = create_product.execute('authData', {
      name: body.name,
      category: body.category,
      description: body.description,
      price: body.price,
    });

    return product;
  }

  @Get(':productId')
  @HttpCode(200)
  async get_product(@Param('productId') product_id: string) {
    const get_product = new GetProduct(new RepositoriesFactory());
    const result = await get_product.execute('autdata', { product_id });
    return result;
  }
}
