/* eslint-disable @typescript-eslint/naming-convention */
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

  @Get('/ping')
  @HttpCode(200)
  async ping() {
    return 'pong';
  }
  /*
 Simulates CPU and RAM consumption
  - It generates a large dataset (simulating a DB query).
  
  - It filters the dataset using an inefficient algorithm (simulating complex business logic).
  
  - It parses data into a new format (simulating response transformation).
*/
  @Get('/stress-test')
  @HttpCode(200)
  async stressTest() {
    console.log('Starting stress test');

    // Simulating a large dataset (like a DB query result)
    const largeDataset = Array.from({ length: 50000 }, (_, i) => ({
      id: i,
      name: `Device_${i}`,
      value: Math.random() * 1000,
    }));

    // Simulating a complex search operation (inefficient filtering)
    const searchValue = Math.random() * 1000;
    const filteredData = largeDataset.filter((item) =>
      item.value.toFixed(2).includes(searchValue.toFixed(2).slice(0, 2)),
    );

    // Simulating CPU usage with an expensive operation
    const sortedData = filteredData.sort((a, b) => a.value - b.value);

    // Simulating parsing/transformation
    const transformedData = sortedData.map((item) => ({
      device: item.name,
      measurement: item.value.toFixed(2),
    }));

    console.log('Stress test completed');

    return {
      count: transformedData.length,
      results: transformedData.slice(0, 10), // Return only a subset to avoid excessive response size
    };
  }
}
