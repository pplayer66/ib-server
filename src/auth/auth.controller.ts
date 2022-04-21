import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { readFile } from "fs/promises";
import { AuthDto } from "./dtos/auth.dto";

@Controller("auth")
export class AuthController {
  @Post()
  async login(@Body() body: AuthDto) {
    const { login, password } = body;
    const userJson = await readFile("user.json", "utf8");
    const user = JSON.parse(userJson);

    if (login === user.email && password === "123") {
      return user;
    }
    throw new HttpException(
      "Invalid username or password",
      HttpStatus.BAD_REQUEST
    );
  }
}
