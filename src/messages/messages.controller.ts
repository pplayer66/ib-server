import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { readFile } from "fs/promises";
import { CreateMessageDto } from "./dtos/create-message.dto";
import { MessagesService } from "./messages.service";

@Controller("messages")
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
  async login(@Body() body: CreateMessageDto) {
    const { login, password } = body;
    if (login === "fred@gmail.com" && password === "123") {
      const data = await readFile(
        "/Users/yerden.abdygapparov/src/scratch/src/user.json",
        "utf8"
      );

      const userData = JSON.parse(data);
      return userData[login];
    }
    return { message: "Invalid username or password" };
  }

  @Get("/:id")
  getMessage(@Param("id") id: string) {
    return this.messagesService.findOne(id);
  }
}
