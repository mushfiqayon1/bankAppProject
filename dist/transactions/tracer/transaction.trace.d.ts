import { CreateTransactionDto } from "../dto/create-transaction.dto";
import { Transaction } from "../entities/transaction.entity";
import { DepositTransactionDto } from "../dto/deposit-transaction.dto";
import { WithdrawTransactionDto } from "../dto/withdraw-transaction.dto";
export declare class TransactionTracer {
    static assignId(accountId: string, targetAccountId: string | null, old: CreateTransactionDto | DepositTransactionDto | WithdrawTransactionDto): Transaction;
}
