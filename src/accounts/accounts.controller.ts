import { Controller, Get } from "@nestjs/common";
import { readFile } from "fs/promises";

@Controller("accounts")
export class AccountsController {
  @Get()
  async getAccounts() {
    const accounts = await readFile("accounts.json", "utf8");
    return JSON.parse(accounts);
  }
}
