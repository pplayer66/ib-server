import { IsString } from "class-validator";

export class LoginDto {
  @IsString()
  login: string;
  password: string;
}
