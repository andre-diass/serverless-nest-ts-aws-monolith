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
// @ApiHeader({ name: 'x-api-key' })
// @UseGuards(AuthGuard)
export class ProductsController {
  @Post()
  @HttpCode(201)
  async create_product(@Body() payload: any) {
    const create_product = new CreateProduct(new RepositoriesFactory());
    console.log(payload);

    // const product = create_product.execute(auth, { payload });
    console.log('----------------------------------');
    console.log('LAMBDA REACHED');
    console.log('----------------------------------');

    const product = 'LAMBDA REACHED';
    return product;
  }

  @Get('')
  @HttpCode(200)
  async get_product() {
    console.log('----------------------------------');
    console.log('LAMBDA REACHED');
    console.log('----------------------------------');

    const product = 'LAMBDA REACHED';
    return product;
  }
}
