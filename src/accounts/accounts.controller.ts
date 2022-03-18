import { Controller, Get } from "@nestjs/common";
import { readFile } from "fs/promises";

@Controller("accounts")
export class AccountsController {
  @Get()
  async getAccounts() {
    const _accounts = await readFile("accounts.json", "utf8");
    const accounts = await new Promise((resolve) => {
      setTimeout(() => resolve(JSON.parse(_accounts)), 2000);
    });

    return accounts;
  }
}
