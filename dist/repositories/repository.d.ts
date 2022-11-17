import { SwyftAccountQuery, SwyftDatabaseTables } from '../typings/types';
import { Account } from '../accounts/entities/account.entity';
import { Transaction } from '../transactions/entities/transaction.entity';
export declare class Repository {
    private readonly repo;
    private static readonly swyftDatabase;
    static DATASTORE: Array<SwyftDatabaseTables>;
    private static readonly SUCCESS;
    private static readonly FAILURE;
    insert: (table: string, data: any) => Promise<boolean>;
    update: (table: string, index: number, data: any) => Promise<boolean>;
    delete: (table: string, index: number) => Promise<boolean>;
    findAll: (table: string) => Promise<Array<Account> | Array<Transaction>>;
    findByKey: (table: string, searchOptions?: {
        key: string;
        id: string;
    }) => Promise<Array<Transaction | Account> | boolean>;
    findById: (id: string, table: string) => Promise<Array<Account | Transaction> | boolean>;
    static isTableEmpty: (table: string) => Promise<boolean>;
    static isTableInDB: (table: string) => Promise<boolean | SwyftDatabaseTables>;
    isExistingAccount: (search: string, searchOptions?: {
        key: string;
    }) => Promise<SwyftAccountQuery>;
    static tables: () => Promise<SwyftDatabaseTables>;
    useKey: (searchOptions?: Record<string, string>) => string;
}
