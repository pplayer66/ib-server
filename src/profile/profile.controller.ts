import { Body, Controller, Get, Post } from "@nestjs/common";
import { readFile, writeFile } from "fs/promises";

@Controller("profile")
export class ProfileController {
  @Get("/")
  async getProfile() {
    const profile = await readFile("profile.json", "utf8");
    return JSON.parse(profile);
  }

  @Post("/")
  async updateProfile(@Body() body: any) {
    const { name, email, lastName } = body;
    await writeFile("profile.json", JSON.stringify(body));

    await writeFile("user.json", JSON.stringify({ email, name, lastName }));

    return await new Promise(async (resolve) => {
      setTimeout(() => resolve(JSON.parse(body)), 2000);
    });
  }
}
