import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { LocationModule } from './location/location.module';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [LocationModule, UsersModule, AuthModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
