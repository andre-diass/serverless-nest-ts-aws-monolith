import { Injectable, Req } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

@Injectable()
@ApiHeader({ name: 'x-api-key' })
export class AppService {
  public get_hello(@Req() req: Request): string {
    console.log(req.body);
    return 'Hello World!';
  }
}
