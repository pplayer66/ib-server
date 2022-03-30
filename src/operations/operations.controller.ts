import { Controller, Get, Query } from "@nestjs/common";
import { readFile } from "fs/promises";
import * as moment from "moment";

@Controller("operations")
export class OperationsController {
  @Get()
  async getOperations(@Query("last") last: string) {
    const operationsJson = await readFile("operations.json", "utf8");
    const operations = JSON.parse(operationsJson);
    const sortedOperations = operations.sort((a, b) =>
      moment(a.date).isBefore(moment(b.date)) ? 1 : -1
    );
    return sortedOperations.slice(0, 3);
  }
}
