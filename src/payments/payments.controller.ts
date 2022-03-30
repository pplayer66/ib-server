import { Body, Controller, Post } from "@nestjs/common";
import { readFile, writeFile } from "fs/promises";
import * as moment from "moment";

@Controller("payments")
export class PaymentsController {
  @Post("/proceed")
  async paymentProceed(@Body() body: any) {
    const { amount, paymentTo, account, serviceId, providerId, template } =
      body;

    const servicesJson = await readFile("services.json", "utf8");
    const service = JSON.parse(servicesJson).find(
      (service) => service.id === serviceId
    ).alias;

    const providersJson = await readFile("providers.json", "utf8");
    const provider = JSON.parse(providersJson).find(
      (provider) => provider.id === providerId
    ).alias;

    const accountsJson = await readFile("accounts.json", "utf8");
    const accounts = JSON.parse(accountsJson);
    const currentAccount = accounts.find((acc) => acc.id === account);
    const newAccount = {
      ...currentAccount,
      amount: +currentAccount.amount - amount,
    };
    const newAccounts = accounts.map((acc) =>
      acc.id === newAccount.id ? newAccount : acc
    );
    await writeFile("accounts.json", JSON.stringify(newAccounts));

    if (template) {
      const templatesJson = await readFile("templates.json", "utf8");
      const templates = JSON.parse(templatesJson);
      const newTemplate = {
        type: "payment",
        alias: template,
        amount: amount,
        currency: "KZT",
        service: service,
        provider: provider,
        to: paymentTo,
      };
      const newTemplates = [...templates, newTemplate];
      console.log(newTemplates);
      await writeFile("templates.json", JSON.stringify(newTemplates));
    }

    const operationsJson = await readFile("operations.json", "utf8");
    const operations = JSON.parse(operationsJson);
    const lastOperation = operations[operations.length - 1];

    const newOperation = {
      id: +lastOperation.id + 1,
      date: moment().format(),
      type: "payment",
      from: account,
      to: paymentTo,
      amount: amount,
      currency: "KZT",
      service: service,
      provider: provider,
    };
    const newOperations = [...operations, newOperation];
    await writeFile("operations.json", JSON.stringify(newOperations));
    return newOperation;
  }
}
