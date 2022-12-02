import { Controller, Get, HttpException } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BankTablesInfo } from "../essentials/typings/types";
import { TransactionsService } from "./transactions.service";

@ApiTags("Transactions")
@Controller("transactions")
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  //Get all the transaction
  @Get()
  async findAllTransactions(): Promise<BankTablesInfo | HttpException> {
    return this.transactionsService.findAllTransactions();
  }
}
