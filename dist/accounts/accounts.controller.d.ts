import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
export declare class AccountsController {
    private accountsService;
    constructor(accountsService: AccountsService);
    createAccount(body: CreateAccountDto): any;
    findAllTransactions(): void;
    findSpecificTransaction(): void;
    addMoneyToAccount(): void;
    withdrawMoneyFromAccount(): void;
    sendMoneyToAccount(): void;
    updateAccount(): void;
}
