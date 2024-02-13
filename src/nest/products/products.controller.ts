import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CreateProduct } from '../../application/usecases/product/CreateProduct';
import { RepositoriesFactory } from '../../infra/factories/RepositoriesFactory';
import { catchError } from 'rxjs';

@Controller('products')
export class ProductsController {
  @Post()
  @HttpCode(200)
  public get_user(@Body() body: any) {
    const create_product = new CreateProduct(new RepositoriesFactory());
    const product = create_product.execute('authData', {
      name: body.name,
      category: body.category,
      description: body.description,
      price: body.price,
    });

    return product;
  }
}
