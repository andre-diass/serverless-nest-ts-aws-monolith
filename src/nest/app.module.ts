import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { HelloController } from './hello/hello.controller';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [HelloController],
  providers: [AppService],
})
export class AppModule {}
