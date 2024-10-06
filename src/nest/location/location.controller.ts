import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { StoreLocation } from '../../application/usecases/location/StoreLocation';
import { RepositoriesFactory } from '../../infra/factories/RepositoriesFactory';

@Controller('location')
// @ApiHeader({ name: 'x-api-key' })
// @UseGuards(AuthGuard)
export class LocationController {
  @Post()
  @HttpCode(201)
  async write_location(@Body() payload: any) {
    const store_location = new StoreLocation(new RepositoriesFactory());

    const response = store_location.execute(payload);
    return response;
  }
}
