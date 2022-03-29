import { Controller, Get, Query } from "@nestjs/common";
import { readFile } from "fs/promises";

@Controller("providers")
export class ProvidersController {
  @Get()
  async getProvidersByServiceId(@Query("serviceId") serviceId: string) {
    const providersJson = await readFile("providers.json", "utf8");
    const providers = JSON.parse(providersJson);

    const filteredProviders = providers.filter(
      (p) => p.serviceId === serviceId
    );

    return filteredProviders;
  }
}
