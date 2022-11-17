import { NotFoundException } from '@nestjs/common';
import { Table } from '../core/database/tables.database';
import { Repository } from '../repositories/repository';
export declare class TransactionsService {
    private readonly tables;
    private repo;
    constructor(tables: Table, repo: Repository);
    findAllTransactions(): Promise<NotFoundException | {
        count: number;
        result: any[] | import("./entities/transaction.entity").Transaction[];
    }>;
}
