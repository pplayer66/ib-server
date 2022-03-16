import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AccountsModule } from '../accounts/accounts.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [AppController],
  imports: [AuthModule, AccountsModule],
})
export class AppModule {}
