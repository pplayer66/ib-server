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
    await writeFile("profile.json", JSON.stringify(body));

    const profileJson = await readFile("profile.json", "utf8");
    return JSON.parse(profileJson);
  }
}
