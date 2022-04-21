import { Controller, Get } from "@nestjs/common";
import { readFile } from "fs/promises";

@Controller("profile")
export class ProfileController {
  @Get("/")
  async getProfile() {
    const profile = await readFile("profile.json", "utf8");
    return JSON.parse(profile);
  }
}
