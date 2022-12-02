import { AccountsService } from "./accounts.service";
import { CreateAccountDto } from "./dto/create-account.dto";
import { UpdateAccountDto } from "./dto/update-account.dto";
import { CreateTransactionDto } from "src/transactions/dto/create-transaction.dto";
import { DepositTransactionDto } from "src/transactions/dto/deposit-transaction.dto";
import { WithdrawTransactionDto } from "../transactions/dto/withdraw-transaction.dto";
export declare class AccountsController {
    private accountsService;
    constructor(accountsService: AccountsService);
    createAccount(body: CreateAccountDto): any;
    findAllAccounts(): Promise<any>;
    findOneAccount(accountId: string): Promise<any>;
    findOneTransaction(accountId: string): Promise<(import("../transactions/entities/transaction.entity").Transaction | import("./entities/account.entity").Account)[] | import("@nestjs/common").NotFoundException>;
    addMoneyToAccount(accountId: string, addTransactionDto: DepositTransactionDto): Promise<any>;
    withdrawMoneyFromAccount(accountId: string, withdrawTransactionDto: WithdrawTransactionDto): Promise<any>;
    sendMoneyToAccount(accountId: string, createTransactionDto: CreateTransactionDto): Promise<any>;
    updateAccount(accountId: string, updateAccountDto: UpdateAccountDto): Promise<any>;
}
