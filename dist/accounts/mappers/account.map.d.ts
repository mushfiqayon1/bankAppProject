import { BalanceAttributes, CreateAccountDto } from '../dto/create-account.dto';
import { Account } from '../entities/account.entity';
import { UpdateAccountDto } from '../dto/update-account.dto';
export declare class AccountMapper {
    static toDomain(raw: CreateAccountDto): Account;
    static toUpdateDomain(accountId: string, raw: UpdateAccountDto, balance: BalanceAttributes): Account;
}
