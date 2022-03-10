import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { readFile } from 'fs/promises';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  messagesService: MessagesService;

  constructor() {
    this.messagesService = new MessagesService();
  }

  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }

  @Post()
  async createMessage(@Body() body: CreateMessageDto) {
    // this.messagesService(body.content)
    const { login, password } = body;
    if (login === 'fred@gmail.com' && password === '123') {
      const data = await readFile('user.json', 'utf8');

      const userData = JSON.parse(data);
      return userData[login];
    }
    throw new HttpException(
      'Invalid username or password',
      HttpStatus.BAD_REQUEST
    );
  }

  @Get('/:id')
  getMessage(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }
}
