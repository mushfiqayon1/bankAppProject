import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { Transaction } from '../entities/transaction.entity';
import { DepositTransactionDto } from '../dto/deposit-transaction.dto';
import { WithdrawTransactionDto } from '../dto/withdraw-transaction.dto';
export declare class TransactionMapper {
    static toDomain(accountId: string, targetAccountId: string | null, raw: CreateTransactionDto | DepositTransactionDto | WithdrawTransactionDto): Transaction;
}
