import { Body, Controller, Post } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

const transfersMap = {
  internal_transfer: true,
  card_to_account: true,
  account_to_card: true,
  deposit_withdraw: true,
  deposit_fulfill: true,
};

@Controller('transfers')
export class TransfersController {
  @Post('/proceed')
  async transfer(@Body() body: any) {
    const { amount, account, transferTo, transferId } = body;

    const accountsJson = await readFile('accounts.json', 'utf8');
    const accounts = JSON.parse(accountsJson);
    const accountFrom = accounts.find(acc => acc.id == account);
    const newAccount = {
      ...accountFrom,
      balance: accountFrom.balance - amount,
    };

    let newAccounts = accounts.map(acc =>
      acc.id == newAccount.id ? newAccount : acc
    );

    if (transfersMap[transferId]) {
      const accountTo = newAccounts.find(acc => acc.id == transferTo);
      const newAccountTo = {
        ...accountTo,
        balance: +accountTo.balance + amount,
      };

      newAccounts = newAccounts.map(acc =>
        acc.id == newAccountTo.id ? newAccountTo : acc
      );
    }

    return await new Promise(async resolve => {
      await writeFile('accounts.json', JSON.stringify(newAccounts));
      setTimeout(() => resolve(newAccounts), 2000);
    });
  }
}
