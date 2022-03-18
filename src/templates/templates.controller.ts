import { Controller, Get } from "@nestjs/common";
import { readFile } from "fs/promises";

@Controller("templates")
export class TemplatesController {
  @Get()
  async getTemplates() {
    const _templates = await readFile("templates.json", "utf8");
    const templates = await new Promise((resolve) => {
      setTimeout(() => resolve(JSON.parse(_templates)), 2000);
    });

    return templates;
  }
}
