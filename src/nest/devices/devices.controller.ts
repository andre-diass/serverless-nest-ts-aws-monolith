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
import { StoreDevice } from '../../application/usecases/devices.ts/StoreDevice';
import { GetDevices } from '../../application/usecases/devices.ts/GetDevices';

@Controller('devices')
// @ApiHeader({ name: 'x-api-key' })
// @UseGuards(AuthGuard)
export class DevicesController {
  @Post()
  @HttpCode(201)
  async write_device(@Body() payload: any) {
    const store_device = new StoreDevice(new RepositoriesFactory());

    const response = store_device.execute(payload);
    return response;
  }

  @Get()
  @HttpCode(200)
  async get_devices(@Query('user_id') user_id: string) {
    const get_devices = new GetDevices(new RepositoriesFactory());
    const locations = await get_devices.execute({
      user_id,
    });
    return locations;
  }
}
