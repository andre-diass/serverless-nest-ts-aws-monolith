import { Controller, Get } from '@nestjs/common';

import { ApiOkResponse, ApiSecurity } from '@nestjs/swagger';
import { CreateHello, ResponseDto } from '../dtos/Hello';

@ApiSecurity('x-api-key')
@ApiSecurity('Authorization')
@Controller('hello')
export class HelloController {
  @Get()
  @ApiOkResponse({ type: ResponseDto })
  public get_user() {
    const user = new CreateHello();
    user.message = 'Hello world';
    user.quantity = 500;

    return user;
  }
}
