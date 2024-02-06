import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  @HttpCode(200)
  public get_user() {
    return 'product created';
  }
}
