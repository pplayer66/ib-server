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
    if (login === "fred@gmail.com" && password === "123") {
      const data = await readFile("user.json", "utf8");

      const userData = JSON.parse(data);
      return userData[login];
    }
    throw new HttpException(
      "Invalid username or password",
      HttpStatus.BAD_REQUEST
    );
  }
}
