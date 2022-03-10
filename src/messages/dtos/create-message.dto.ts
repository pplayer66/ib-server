import { IsString } from "class-validator";

export class CreateMessageDto {
  @IsString()
  login: string;
  password: string;
}
