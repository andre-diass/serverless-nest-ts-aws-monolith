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
import { ApiHeader, ApiSecurity } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { Auth, AuthPayload } from '../auth/auth.decorator';
import { RepositoriesFactory } from '../../infra/factories/RepositoriesFactory';
import { GetProduct } from '../../application/usecases/product/GetProduct';

@Controller('products')
@ApiHeader({ name: 'x-api-key' })
@UseGuards(AuthGuard)
export class ProductsController {
  @Post()
  @HttpCode(201)
  async create_product(@Auth() auth: AuthPayload, @Body() payload: any) {
    const create_product = new CreateProduct(new RepositoriesFactory());
    console.log(payload);

    const product = create_product.execute(auth, { payload });
    return product;
  }

  @Get(':productId')
  @HttpCode(200)
  async get_product(
    @Auth() auth: AuthPayload,
    @Param('productId') product_id: string,
  ) {
    const get_product = new GetProduct(new RepositoriesFactory());
    console.log(product_id);

    const result = await get_product.execute(auth, { product_id });
    return result;
  }
}
