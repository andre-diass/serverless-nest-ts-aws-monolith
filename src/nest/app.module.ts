import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProductsModule, UsersModule, AuthModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
