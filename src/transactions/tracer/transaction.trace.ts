import { CreateTransactionDto } from "../dto/create-transaction.dto";
import { Transaction } from "../entities/transaction.entity";

import { v4 as uuidv4 } from "uuid";
import { DepositTransactionDto } from "../dto/deposit-transaction.dto";
import { WithdrawTransactionDto } from "../dto/withdraw-transaction.dto";

export class TransactionTracer {
  public static assignId(
    accountId: string,
    targetAccountId: string | null,
    old: CreateTransactionDto | DepositTransactionDto | WithdrawTransactionDto
  ): Transaction {
    return new Transaction(
      uuidv4().toString(),
      targetAccountId,
      old.note.trim(),
      {
        amount: old.amount_money.amount.toFixed(2),
        ...old.amount_money,
      },
      accountId
    );
  }
}
