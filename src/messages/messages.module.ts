import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [MessagesController],
  modules: [AuthModule],
})
export class MessagesModule {}
