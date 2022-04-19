import { Body, Controller, Post } from "@nestjs/common";
import { readFile, writeFile } from "fs/promises";

const usdToKzt = 453;
const rubToKzt = 5.43;
const ustToRub = 79;

@Controller("conversion")
export class ConversionController {
  @Post("/proceed")
  async transfer(@Body() body: any) {
    const { amount, account, transferTo, transferId } = body;

    const accountsJson = await readFile("accounts.json", "utf8");
    let accounts = JSON.parse(accountsJson);
    const accountFrom = accounts.find((acc) => acc.id == account);
    accountFrom.balance = accountFrom.balance - amount;
    const fromCur = accountFrom.currencyCode;

    const accountTo = accounts.find((acc) => acc.id == transferTo);
    let balanceTo = accountTo.balance;
    const curTo = accountTo.currencyCode;

    if (fromCur === "USD" && curTo === "RUB") {
      balanceTo = balanceTo + amount * 79;
    } else if (fromCur === "RUB" && curTo === "USD") {
      balanceTo = balanceTo + amount / 79;
    } else if (fromCur === "USD" && curTo === "KZT") {
      balanceTo = balanceTo + amount * 453;
    } else if (fromCur === "KZT" && curTo === "USD") {
      balanceTo = balanceTo + amount / 453;
    } else if (fromCur === "RUB" && curTo === "KZT") {
      balanceTo = balanceTo + amount * 5.43;
    } else if (fromCur === "KZT" && curTo === "RUB") {
      balanceTo = balanceTo + amount / 5.43;
    }

    accountTo.balance = balanceTo;

    accounts = accounts.map((acc) => {
      if (acc.id == account) return accountFrom;
      if (acc.id == transferTo) return transferTo;
      return acc;
    });

    await writeFile("accounts.json", JSON.stringify(accounts));
  }
}
