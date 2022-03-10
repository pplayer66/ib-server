import { IsString } from "class-validator";

export class CreateMessageDto {
  @IsString()
  //content: string;
  login: string;
  password: string;
}
