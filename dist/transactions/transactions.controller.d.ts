import { HttpException } from '@nestjs/common';
import { SwyftTablesInfo } from '../typings/types';
import { TransactionsService } from './transactions.service';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    findAllTransactions(): Promise<SwyftTablesInfo | HttpException>;
}
