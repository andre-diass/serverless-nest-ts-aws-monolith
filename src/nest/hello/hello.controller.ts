import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { CreateHello, ResponseDto } from '../dtos/Hello';
import { AuthGuard } from '../auth/auth.guard';

@ApiSecurity('x-api-key')
@ApiBearerAuth()
@ApiTags('hello')
@Controller('hello')
export class HelloController {
  @Get()
  @UseGuards(AuthGuard) //RolesGuard class (instead of an instance), leaving responsibility for instantiation to the framework and enabling dependency injection
  @ApiOkResponse({ type: ResponseDto })
  public get_user() {
    const user = new CreateHello();
    user.message = 'Hello world';
    user.quantity = 500;

    return user;
  }
}
