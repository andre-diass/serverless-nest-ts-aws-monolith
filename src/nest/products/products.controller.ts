import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateProduct } from '../../application/usecases/product/CreateProduct';
import { RepositoriesFactory } from '../../infra/factories/RepositoriesFactory';
import { GetProduct } from '../../application/usecases/product/GetProduct';
import { ApiHeader, ApiSecurity } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { Auth, AuthPayload } from '../auth/auth.decorator';

@Controller('products')
@ApiHeader({ name: 'x-api-key' })
@UseGuards(AuthGuard)
export class ProductsController {
  @Post()
  @HttpCode(201)
  async create_product(@Auth() auth: AuthPayload, @Body() body: any) {
    console.log(auth);

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
    const result = await get_product.execute('authdata', { product_id });
    return result;
  }
}
