import { HttpException } from "@nestjs/common";
import { BankTablesInfo } from "../essentials/typings/types";
import { TransactionsService } from "./transactions.service";
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    findAllTransactions(): Promise<BankTablesInfo | HttpException>;
}
