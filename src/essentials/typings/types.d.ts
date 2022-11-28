import { Account } from "../../accounts/entities/account.entity";
import { Transaction } from "../../transactions/entities/transaction.entity";

//  * Type for the bank database tables

type BankDatabaseTables = {
  accounts: Array<Account>;
  transactions: Array<Transaction>;
};

//  * Type for individual query result from the account table

type BankAccountQuery = { account: Account; index: number };

//  * Type for query results from bank database tables

type BankTablesInfo = { count: number; result: Array<Account | Transaction> };
