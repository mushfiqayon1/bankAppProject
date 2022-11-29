import { BalanceAttributes, CreateAccountDto } from "../dto/create-account.dto";
import { Account } from "../entities/account.entity";
import { UpdateAccountDto } from "../dto/update-account.dto";
export declare class AccountTracer {
    static assignId(old: CreateAccountDto): Account;
    static toUpdateAttribute(accountId: string, old: UpdateAccountDto, balance: BalanceAttributes): Account;
}
