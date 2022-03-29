import { Controller, Get } from "@nestjs/common";
import { readFile } from "fs/promises";

@Controller("services")
export class ServicesController {
  @Get()
  async getServices() {
    const servicesJson = await readFile("services.json", "utf8");
    const services = JSON.parse(servicesJson);
    return services;
  }
}
