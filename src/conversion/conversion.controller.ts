import { Body, Controller, Post } from "@nestjs/common";
import { readFile } from "fs/promises";

const ratesMap = {
  USD: 453,
  RUB: 5.46,
};

@Controller("conversion")
export class ConversionController {
  @Post("/proceed")
  async transfer(@Body() body: any) {
    const { amount, account, transferTo, transferId } = body;

    const accountsJson = await readFile("accounts.json", "utf8");
    const accounts = JSON.parse(accountsJson);
    const accountFrom = accounts.find((acc) => acc.id == account);
    const accountTo = accounts.find((acc) => acc.id == transferTo);
  }
}
