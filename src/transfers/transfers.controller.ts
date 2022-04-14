import { Body, Controller } from "@nestjs/common";
import { readFile, writeFile } from "fs/promises";

@Controller("transfers")
export class TransfersController {
  async transfer(@Body() body: any) {
    const { amount, account, transferTo, transderId } = body;

    const accountJson = await readFile("accounts.json", "utf8");
    const accounts = JSON.parse(accountJson);
    const accountFrom = accounts.filter((acc) => acc.id == account);
    const newAccount = {
      ...accountFrom,
      balance: (accountFrom.balance - amount).toFixed(2),
    };
    let newAccounts = accounts.map((acc) =>
      acc.id == newAccount.id ? newAccount : acc
    );

    if (transderId === "internal_transfer") {
      const accountTo = accounts.filter((acc) => acc.id == transferTo);
      const newAccountTo = {
        ...accountTo,
        balance: (accountTo.balance - amount).toFixed(2),
      };
      newAccounts = newAccounts.map((acc) =>
        acc.id == newAccountTo.id ? newAccountTo : acc
      );
    }
    await writeFile("accounts.json", JSON.stringify(newAccounts));
  }
}
