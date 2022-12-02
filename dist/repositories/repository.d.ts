import { BankAccountQuery, BankDatabaseTables } from "../essentials/typings/types";
import { Account } from "../accounts/entities/account.entity";
import { Transaction } from "../transactions/entities/transaction.entity";
export declare class Repository {
    private readonly myRepo;
    private static readonly bankDatabase;
    static DATASTORE: Array<BankDatabaseTables>;
    private static readonly SUCCESS;
    private static readonly FAILURE;
    insert: (table: string, data: any) => Promise<boolean>;
    update: (table: string, index: number, data: any) => Promise<boolean>;
    findAll: (table: string) => Promise<Array<Account> | Array<Transaction>>;
    findByKey: (table: string, searchCategory?: {
        key: string;
        id: string;
    }) => Promise<Array<Transaction | Account> | boolean>;
    findById: (id: string, table: string) => Promise<Array<Account | Transaction> | boolean>;
    static isTableEmpty: (table: string) => Promise<boolean>;
    static isTableInDB: (table: string) => Promise<boolean | BankDatabaseTables>;
    isExistingAccount: (search: string, searchCategory?: {
        key: string;
    }) => Promise<BankAccountQuery>;
    static tables: () => Promise<BankDatabaseTables>;
    useKey: (searchCategory?: Record<string, string>) => string;
}
