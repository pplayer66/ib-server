import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  @Post()
  login(@Body() body: LoginDto) {
    console.log(body);
  }
}
