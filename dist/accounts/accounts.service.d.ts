import { NotFoundException } from "@nestjs/common";
import { CreateAccountDto } from "./dto/create-account.dto";
import { Repository } from "../repositories/repository";
import { Table } from "../essentials/database/tables.database";
import { UpdateAccountDto } from "./dto/update-account.dto";
import { DepositTransactionDto } from "../transactions/dto/deposit-transaction.dto";
import { BankSession } from "../essentials/sessions/bankSession.session";
import { CreateTransactionDto } from "../transactions/dto/create-transaction.dto";
import { WithdrawTransactionDto } from "src/transactions/dto/withdraw-transaction.dto";
export declare class AccountsService {
    private repository;
    private readonly tables;
    private session;
    private readonly miniWithdrawAmmount;
    private readonly maxSendAmmount;
    private readonly minSendAmmount;
    constructor(repository: Repository, tables: Table, session: BankSession);
    createAccount(createAccountDto: CreateAccountDto): Promise<any>;
    updateAccount(accountId: string, updateAccountDto: UpdateAccountDto): Promise<any>;
    findAllAccounts(): Promise<any>;
    findAllTransactions(): Promise<any>;
    findOneAccount(accountId: string): Promise<any>;
    findOneTransaction(accountId: string): Promise<(import("../transactions/entities/transaction.entity").Transaction | import("./entities/account.entity").Account)[] | NotFoundException>;
    addMoneyToAccount(accountId: string, addTransactionDto: DepositTransactionDto): Promise<any>;
    withdrawMoneyFromAccount(accountId: string, withdrawTransactionDto: WithdrawTransactionDto): Promise<any>;
    sendMoneyToAccount(accountId: string, createTransactionDto: CreateTransactionDto): Promise<any>;
    private debit;
    private credit;
    private updateAccountFields;
}
