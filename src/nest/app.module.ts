import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { HelloController } from './hello/hello.controller';

@Module({
  imports: [],
  controllers: [HelloController],
  providers: [AppService],
})
export class AppModule {}
