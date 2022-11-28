"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsService = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("../repositories/repository");
const tables_database_1 = require("../essentials/database/tables.database");
const account_trace_1 = require("./tracer/account.trace");
const bankSession_session_1 = require("../essentials/sessions/bankSession.session");
const transaction_trace_1 = require("../transactions/tracer/transaction.trace");
let AccountsService = class AccountsService {
    constructor(repository, tables, session) {
        this.repository = repository;
        this.tables = tables;
        this.session = session;
        this.miniWithdrawAmmount = 20;
        this.maxSendAmmount = 1000;
        this.minSendAmmount = 1;
    }
    async createAccount(createAccountDto) {
        try {
            const findKey = this.repository.findByKey(this.tables.ACCOUNTS, {
                key: "email_address",
                id: createAccountDto.email_address,
            });
            if (!Array.isArray(findKey)) {
                const result = this.repository.insert(this.tables.ACCOUNTS, account_trace_1.AccountMapper.assignId(Object.assign({}, createAccountDto)));
                if (result) {
                    console.log("Result: ", await this.repository.findAll("accounts"));
                    return { result: true, message: "Account created succesfully" };
                }
                else {
                    throw new common_1.InternalServerErrorException("An error occurred while trying to create account. Please try again!");
                }
            }
            else {
                throw new common_1.ConflictException({
                    message: `An account already exists for the user with email ${createAccountDto.email_address}`,
                });
            }
        }
        catch (error) {
            console.log("Fix the error");
            console.log(error);
            return error;
        }
    }
    async updateAccount(accountId, updateAccountDto) {
        try {
            const accountExist = await this.repository.isExistingAccount(accountId);
            if (!accountExist.account.id) {
                throw new common_1.NotFoundException("Account does not exist!");
            }
            const updatedAccount = Object.assign(Object.assign({}, accountExist.account), updateAccountDto);
            const result = this.repository.update(this.tables.ACCOUNTS, accountExist.index, account_trace_1.AccountMapper.toUpdateAttribute(accountId, updatedAccount, updatedAccount.balance));
            if (result) {
                console.log("Result: ", await this.repository.findAll("accounts"));
                return { result: true, message: "Account updated succesfully" };
            }
            else
                throw new common_1.NotFoundException("Cannot update. please try again!");
        }
        catch (error) {
            return error;
        }
    }
    async findAllAccounts() {
        try {
            const allAccounts = await this.repository.findAll(this.tables.ACCOUNTS);
            console.log(allAccounts.length);
            if (allAccounts) {
                return allAccounts;
            }
            else
                throw new common_1.NotFoundException("Can not get all accounts");
        }
        catch (error) {
            return error;
        }
    }
    async findAllTransactions() {
        try {
            const findAllTransactions = await this.repository.findAll(this.tables.TRANSACTIONS);
            console.log(findAllTransactions.length);
            if (findAllTransactions) {
                return findAllTransactions;
            }
            else
                throw new common_1.NotFoundException("Can not get all Transactions");
        }
        catch (error) {
            return error;
        }
    }
    async findOneAccount(accountId) {
        try {
            const accountExist = await this.repository.findById(accountId, this.tables.ACCOUNTS);
            console.log(accountExist);
            const result = Array.isArray(accountExist);
            console.log(result);
            if (result) {
                return accountExist;
            }
            else
                throw new common_1.NotFoundException("No account found provided by this id. Check id and try again");
        }
        catch (error) {
            return error;
        }
    }
    async findOneTransaction(accountId) {
        try {
            const accountExist = this.repository.isExistingAccount(accountId);
            if (accountExist) {
                const transactionWithThisAccount = await this.repository.findByKey(this.tables.TRANSACTIONS, { key: "account_id", id: accountId });
                if (Array.isArray(transactionWithThisAccount)) {
                    return transactionWithThisAccount;
                }
                else
                    throw new common_1.NotFoundException("No transaction found with this account");
            }
        }
        catch (error) {
            return new common_1.NotFoundException("Can not find any account with this id");
        }
    }
    async addMoneyToAccount(accountId, addTransactionDto) {
        try {
            const accountExist = this.repository.isExistingAccount(accountId);
            if (accountExist) {
                const accountInSession = this.session.isInSession(accountId).status;
                if (!accountInSession) {
                    const createSessionForThisAccount = this.session.initSession(accountId);
                    const updateAccountBalance = this.repository.update(this.tables.ACCOUNTS, (await accountExist).index, this.credit(await accountExist, addTransactionDto.amount_money.amount));
                    if (updateAccountBalance) {
                        const insertTrasactionInDB = this.repository.insert(this.tables.TRANSACTIONS, transaction_trace_1.TransactionMapper.assignId(accountId, null, addTransactionDto));
                        console.log((await accountExist).account);
                        () => this.session.killSession(accountId);
                        return { message: "Money Added Successfully on the account" };
                    }
                }
                else
                    throw new common_1.ConflictException("This account is in session now, can not execute your request, try again!");
            }
        }
        catch (error) {
            return error;
        }
    }
    async withdrawMoneyFromAccount(accountId, withdrawTransactionDto) {
        try {
            const accountExist = await this.repository.isExistingAccount(accountId);
            if (accountExist) {
                const accountInSession = this.session.isInSession(accountId);
                if (!accountInSession) {
                    const createSessionForThisAccount = this.session.initSession(accountId);
                }
                if (withdrawTransactionDto.amount_money.amount <
                    accountExist.account.balance.amount) {
                    if (withdrawTransactionDto.amount_money.amount >
                        this.miniWithdrawAmmount) {
                        const updateAccount = this.repository.update(this.tables.ACCOUNTS, accountExist.index, this.debit(accountExist, withdrawTransactionDto.amount_money.amount));
                        if (updateAccount) {
                            const insertTrasactionInDB = this.repository.insert(this.tables.TRANSACTIONS, transaction_trace_1.TransactionMapper.assignId(accountId, null, withdrawTransactionDto));
                            () => this.session.killSession(accountId);
                            return { message: "Your withdrawl has been Successful" };
                        }
                        else
                            throw new common_1.NotAcceptableException("Can not update the account for this withdraw");
                    }
                    else
                        throw new common_1.NotAcceptableException("Withdraw ammount have to be GREATER than the Minimum withdraw ammount [20$] ");
                }
                else
                    throw new common_1.NotAcceptableException("Withdraw account CAN NOT be more than your account");
            }
        }
        catch (error) {
            return error;
        }
    }
    async sendMoneyToAccount(accountId, createTransactionDto) {
        try {
            const sourceAccount = this.repository.isExistingAccount(accountId);
            if (sourceAccount) {
                const targetAccount = this.repository.isExistingAccount(createTransactionDto.target_account_id);
                if (targetAccount) {
                    const accountInSession = this.session.isInSession(accountId);
                    if (!accountInSession) {
                        const createSessionForThisAccount = this.session.initSession(accountId);
                    }
                    if ((await sourceAccount).account.balance.amount <
                        createTransactionDto.amount_money.amount ||
                        (await sourceAccount).account.balance.amount <= 0) {
                        return new common_1.NotAcceptableException("Send ammount can not be more than your balance.");
                    }
                    if (createTransactionDto.amount_money.amount < this.minSendAmmount) {
                        return new common_1.NotAcceptableException("Your requested send amount should be more than the Minimum Ammount");
                    }
                    if (createTransactionDto.amount_money.amount > this.maxSendAmmount) {
                        return new common_1.NotAcceptableException("Your requested send amount should be less than the Max transaction Ammount");
                    }
                    const updateSourceAccount = this.repository.update(this.tables.ACCOUNTS, (await targetAccount).index, this.debit(await sourceAccount, createTransactionDto.amount_money.amount));
                    const updateTargetAccount = this.repository.update(this.tables.ACCOUNTS, (await targetAccount).index, this.credit(await targetAccount, createTransactionDto.amount_money.amount));
                    if (updateSourceAccount && updateTargetAccount) {
                        const insertTrasactionInDB = this.repository.insert(this.tables.TRANSACTIONS, transaction_trace_1.TransactionMapper.assignId(accountId, createTransactionDto.target_account_id, createTransactionDto));
                        () => this.session.killSession(accountId);
                        return { message: "Transaction is successfull" };
                    }
                    else
                        throw new common_1.NotAcceptableException("can not update account with this transaction");
                }
                else
                    throw new common_1.NotAcceptableException("target account is not valid");
            }
            else
                throw new common_1.NotAcceptableException("source account is not valid");
        }
        catch (error) {
            return error;
        }
    }
    debit(accountDto, amount) {
        return this.updateAccountFields(accountDto, accountDto.account.balance.amount - amount);
    }
    credit(accountDto, amount) {
        return this.updateAccountFields(accountDto, accountDto.account.balance.amount + amount);
    }
    updateAccountFields(accountDto, amountBalance) {
        return Object.assign(Object.assign({}, accountDto.account), {
            balance: {
                amount: Number(amountBalance.toFixed(2)),
                currency: accountDto.account.balance.currency,
            },
        });
    }
};
AccountsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.Repository,
        tables_database_1.Table,
        bankSession_session_1.BankSession])
], AccountsService);
exports.AccountsService = AccountsService;
//# sourceMappingURL=accounts.service.js.map