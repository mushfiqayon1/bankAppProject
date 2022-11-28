import { BalanceAttributes, CreateAccountDto } from "../dto/create-account.dto";
import { Account } from "../entities/account.entity";
import { v4 as uuidv4 } from "uuid";

import { UpdateAccountDto } from "../dto/update-account.dto";

export class AccountMapper {
  // Assigning a uuid to each account so that we can trace all these accounts
  public static assignId(old: CreateAccountDto): Account {
    console.log(old);
    return new Account(
      uuidv4().toString(),
      old.given_name.trim(),
      old.family_name.trim(),
      old.email_address.trim(),
      old.note.trim(),
      {
        amount: old.balance.amount.toFixed(2),
        ...old.balance,
      }
    );
  }

  // update the attributes for the Accounts table
  public static toUpdateAttribute(
    accountId: string,
    old: UpdateAccountDto,
    balance: BalanceAttributes
  ): Account {
    return new Account(
      accountId,
      old.given_name.trim(),
      old.family_name.trim(),
      old.email_address.trim(),
      old.note.trim(),
      balance
    );
  }
}
