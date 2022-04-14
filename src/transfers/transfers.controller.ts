import { Body, Controller, Post } from "@nestjs/common";
import { readFile, writeFile } from "fs/promises";

@Controller("transfers")
export class TransfersController {
  @Post("/proceed")
  async transfer(@Body() body: any) {
    const { amount, account, transferTo, transferId } = body;

    const accountsJson = await readFile("accounts.json", "utf8");
    const accounts = JSON.parse(accountsJson);
    const accountFrom = accounts.find((acc) => acc.id == account);
    const newAccount = {
      ...accountFrom,
      balance: accountFrom.balance - amount,
    };
    console.log(newAccount);
    let newAccounts = accounts.map((acc) =>
      acc.id == newAccount.id ? newAccount : acc
    );

    if (transferId === "internal_transfer") {
      const accountTo = newAccounts.find((acc) => acc.id == transferTo);
      console.log(accountTo);
      const newAccountTo = {
        ...accountTo,
        balance: +accountTo.balance + amount,
      };
      console.log(newAccountTo);
      newAccounts = newAccounts.map((acc) =>
        acc.id == newAccountTo.id ? newAccountTo : acc
      );
    }
    await writeFile("accounts.json", JSON.stringify(newAccounts));
  }
}
