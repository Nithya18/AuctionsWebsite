import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuctionsModule } from './modules/auctions/auctions.module';
import { UsersModule } from './modules/users/users.module';
@Module({
  imports: [AuctionsModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
