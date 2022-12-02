import { NotFoundException } from "@nestjs/common";
import { Table } from "../essentials/database/tables.database";
import { Repository } from "../repositories/repository";
export declare class TransactionsService {
    private readonly tables;
    private repo;
    constructor(tables: Table, repo: Repository);
    findAllTransactions(): Promise<NotFoundException | {
        count: number;
        result: import("../accounts/entities/account.entity").Account[] | import("./entities/transaction.entity").Transaction[];
    }>;
}
