import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { StoreLocation } from '../../application/usecases/location/StoreLocation';
import { RepositoriesFactory } from '../../infra/factories/RepositoriesFactory';
import { GetLocation } from '../../application/usecases/location/GetLocation';

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

  @Get()
  @HttpCode(200)
  async get_location(
    @Query('imei') imei: number,
    @Query('reference_date') reference_date: string,
  ) {
    const get_location = new GetLocation(new RepositoriesFactory());
    const locations = await get_location.execute({
      imei,
      reference_date,
    });
    return locations;
  }
}
