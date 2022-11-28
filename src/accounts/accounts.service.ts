import {
  ConflictException,
  InternalServerErrorException,
  Injectable,
  NotFoundException,
  Get,
  Param,
  NotAcceptableException,
} from "@nestjs/common";
import { CreateAccountDto } from "./dto/create-account.dto";
import { Account } from "./dto/entities/account.entity";
import { Repository } from "../repositories/repository";
import { Table } from "../essentials/database/tables.database";
import { AccountMapper } from "./tracer/account.trace";
import { UpdateAccountDto } from "./dto/update-account.dto";
import { DepositTransactionDto } from "../transactions/dto/deposit-transaction.dto";
import { BankSession } from "../essentials/sessions/bankSession.session";
import { CreateTransactionDto } from "../transactions/dto/create-transaction.dto";
import { BankAccountQuery } from "../essentials/typings/types";
import { TransactionMapper } from "../transactions/tracer/transaction.trace";
import { WithdrawTransactionDto } from "src/transactions/dto/withdraw-transaction.dto";

@Injectable()
export class AccountsService {
  private readonly miniWithdrawAmmount: number = 20;
  private readonly maxSendAmmount: number = 1000;
  private readonly minSendAmmount: number = 1;

  constructor(
    private repository: Repository,
    private readonly tables: Table,
    private session: BankSession
  ) {}

  async createAccount(createAccountDto: CreateAccountDto) {
    try {
      const findKey = this.repository.findByKey(this.tables.ACCOUNTS, {
        key: "email_address",
        id: createAccountDto.email_address,
      });

      if (!Array.isArray(findKey)) {
        const result = this.repository.insert(
          this.tables.ACCOUNTS,
          AccountMapper.assignId({ ...createAccountDto })
        );

        if (result) {
          console.log("Result: ", await this.repository.findAll("accounts"));
          return { result: true, message: "Account created succesfully" };
        } else {
          throw new InternalServerErrorException(
            "An error occurred while trying to create account. Please try again!"
          );
        }
      } else {
        throw new ConflictException({
          message: `An account already exists for the user with email ${createAccountDto.email_address}`,
        });
      }
    } catch (error) {
      console.log("Fix the error");
      console.log(error);
      return error;
    }
  } //end for createAccount

  // Update an existing account
  async updateAccount(accountId: string, updateAccountDto: UpdateAccountDto) {
    try {
      const accountExist = await this.repository.isExistingAccount(accountId);

      if (!accountExist.account.id) {
        throw new NotFoundException("Account does not exist!");
      }

      // merge updated atrtributes to existing account
      const updatedAccount = {
        ...accountExist.account,
        ...updateAccountDto,
      };

      // Update the database
      const result = this.repository.update(
        this.tables.ACCOUNTS,
        accountExist.index,
        AccountMapper.toUpdateAttribute(
          accountId,
          updatedAccount,
          updatedAccount.balance
        )
      );

      if (result) {
        console.log("Result: ", await this.repository.findAll("accounts"));
        return { result: true, message: "Account updated succesfully" };
      } else throw new NotFoundException("Cannot update. please try again!");

      /* 
        try {
      const accountExist = this.repository.isExistingAccount(accountId);

      // const existingAccount = existingAccount => {}

      if (accountExist) {
        (existingAccount) => {
          const updatedAttributes: Account = {
            ...existingAccount.account,
            ...updateAccountDto,
          };
        };
        const updatedAccount = this.repository.update(
          this.tables.ACCOUNTS,
          existingAccount.index,
          AccountMapper.toUpdateDomain(
            accountId,
            updatedAttributes,
            updatedAttributes.balance
          )
        );
      }
    } catch {}
      
      */
    } catch (error) {
      return error;
    }
  }

  async findAllAccounts() {
    try {
      const allAccounts = await this.repository.findAll(this.tables.ACCOUNTS);
      console.log(allAccounts.length);

      if (allAccounts) {
        return allAccounts;
      } else throw new NotFoundException("Can not get all accounts");
    } catch (error) {
      return error;
    }
  } //end of findAllAccounts

  async findAllTransactions() {
    try {
      const findAllTransactions = await this.repository.findAll(
        this.tables.TRANSACTIONS
      );
      console.log(findAllTransactions.length);

      if (findAllTransactions) {
        return findAllTransactions;
      } else throw new NotFoundException("Can not get all Transactions");
    } catch (error) {
      return error;
    }
  } //end of findAllTransactions

  async findOneAccount(accountId: string) {
    try {
      const accountExist = await this.repository.findById(
        accountId,
        this.tables.ACCOUNTS
      );

      console.log(accountExist);
      const result = Array.isArray(accountExist);
      console.log(result);
      if (result) {
        return accountExist;
      } else
        throw new NotFoundException(
          "No account found provided by this id. Check id and try again"
        );
    } catch (error) {
      return error;
    }
  } // end of findOneAccount

  async findOneTransaction(accountId: string) {
    try {
      const accountExist = this.repository.isExistingAccount(accountId);
      if (accountExist) {
        const transactionWithThisAccount = await this.repository.findByKey(
          this.tables.TRANSACTIONS,
          { key: "account_id", id: accountId }
        );
        if (Array.isArray(transactionWithThisAccount)) {
          return transactionWithThisAccount;
        } else
          throw new NotFoundException("No transaction found with this account");
      }
    } catch (error) {
      return new NotFoundException("Can not find any account with this id");
    }
  } //end of findOneTransaction

  async addMoneyToAccount(
    accountId: string,
    addTransactionDto: DepositTransactionDto
  ) {
    try {
      const accountExist = this.repository.isExistingAccount(accountId);

      if (accountExist) {
        const accountInSession = this.session.isInSession(accountId).status;
        if (!accountInSession) {
          const createSessionForThisAccount =
            this.session.initSession(accountId);

          const updateAccountBalance = this.repository.update(
            this.tables.ACCOUNTS,
            (await accountExist).index,
            this.credit(
              await accountExist,
              addTransactionDto.amount_money.amount
            )
          );

          if (updateAccountBalance) {
            const insertTrasactionInDB = this.repository.insert(
              this.tables.TRANSACTIONS,
              TransactionMapper.assignId(accountId, null, addTransactionDto)
            );
            console.log((await accountExist).account);
            () => this.session.killSession(accountId);
            return { message: "Money Added Successfully on the account" };
          }
        } else
          throw new ConflictException(
            "This account is in session now, can not execute your request, try again!"
          );
      }
    } catch (error) {
      return error;
    }
  } //end of addMoneytoAccount

  async withdrawMoneyFromAccount(
    accountId: string,
    withdrawTransactionDto: WithdrawTransactionDto
  ) {
    try {
      const accountExist = await this.repository.isExistingAccount(accountId);

      if (accountExist) {
        const accountInSession = this.session.isInSession(accountId);
        if (!accountInSession) {
          const createSessionForThisAccount =
            this.session.initSession(accountId);
        }
        // check WithDraw Balance Is Less Than Account
        if (
          withdrawTransactionDto.amount_money.amount <
          accountExist.account.balance.amount
        ) {
          //Check withdraw ammout is MORE than Minimum ammount
          if (
            withdrawTransactionDto.amount_money.amount >
            this.miniWithdrawAmmount
          ) {
            const updateAccount = this.repository.update(
              this.tables.ACCOUNTS,
              accountExist.index,
              this.debit(
                accountExist,
                withdrawTransactionDto.amount_money.amount
              )
            );
            if (updateAccount) {
              const insertTrasactionInDB = this.repository.insert(
                this.tables.TRANSACTIONS,
                TransactionMapper.assignId(
                  accountId,
                  null,
                  withdrawTransactionDto
                )
              );
              () => this.session.killSession(accountId);
              return { message: "Your withdrawl has been Successful" };
            } else
              throw new NotAcceptableException(
                "Can not update the account for this withdraw"
              );
          } else
            throw new NotAcceptableException(
              "Withdraw ammount have to be GREATER than the Minimum withdraw ammount [20$] "
            );
        } else
          throw new NotAcceptableException(
            "Withdraw account CAN NOT be more than your account"
          );
      }
    } catch (error) {
      return error;
    }
  } //end of withdraw money from account

  async sendMoneyToAccount(
    accountId: string,
    createTransactionDto: CreateTransactionDto
  ) {
    try {
      const sourceAccount = this.repository.isExistingAccount(accountId);

      if (sourceAccount) {
        const targetAccount = this.repository.isExistingAccount(
          createTransactionDto.target_account_id
        );

        if (targetAccount) {
          // check session if there is no session create one
          const accountInSession = this.session.isInSession(accountId);
          if (!accountInSession) {
            const createSessionForThisAccount =
              this.session.initSession(accountId);
          }

          // Check that the requested amount is within the balance range
          if (
            (await sourceAccount).account.balance.amount <
              createTransactionDto.amount_money.amount ||
            (await sourceAccount).account.balance.amount <= 0
          ) {
            return new NotAcceptableException(
              "Send ammount can not be more than your balance."
            );
          }
          // Check that the amount to send is greater than minimum
          if (createTransactionDto.amount_money.amount < this.minSendAmmount) {
            return new NotAcceptableException(
              "Your requested send amount should be more than the Minimum Ammount"
            );
          }
          // Check that the amount to send is less than maxium
          if (createTransactionDto.amount_money.amount > this.maxSendAmmount) {
            return new NotAcceptableException(
              "Your requested send amount should be less than the Max transaction Ammount"
            );
          }

          const updateSourceAccount = this.repository.update(
            this.tables.ACCOUNTS,
            (await targetAccount).index,
            this.debit(
              await sourceAccount,
              createTransactionDto.amount_money.amount
            )
          );

          const updateTargetAccount = this.repository.update(
            this.tables.ACCOUNTS,
            (await targetAccount).index,
            this.credit(
              await targetAccount,
              createTransactionDto.amount_money.amount
            )
          );
          if (updateSourceAccount && updateTargetAccount) {
            const insertTrasactionInDB = this.repository.insert(
              this.tables.TRANSACTIONS,
              TransactionMapper.assignId(
                accountId,
                createTransactionDto.target_account_id,
                createTransactionDto
              )
            );
            () => this.session.killSession(accountId);
            return { message: "Transaction is successfull" };
          } else
            throw new NotAcceptableException(
              "can not update account with this transaction"
            );
        } else throw new NotAcceptableException("target account is not valid");
      } else throw new NotAcceptableException("source account is not valid");
    } catch (error) {
      return error;
    }
  }

  /**
   * Debit a given account
   * @param accountDto Source/Target account payload
   * @param amount Amount to debit
   * @returns
   */
  private debit(accountDto: BankAccountQuery, amount: number) {
    return this.updateAccountFields(
      accountDto,
      accountDto.account.balance.amount - amount
    );
  }
  /**
   * Credit a given account
   * @param accountDto Source/Target account payload
   * @param amount Amount to credit
   * @returns
   */
  private credit(accountDto: BankAccountQuery, amount: number) {
    return this.updateAccountFields(
      accountDto,
      accountDto.account.balance.amount + amount
    );
  }

  /**
   * Update fields for debitted/credited accounts
   * @param accountDto Source/Target account payload
   * @param amountBalance Balance value
   * @returns
   */
  private updateAccountFields(
    accountDto: BankAccountQuery,
    amountBalance: number
  ) {
    return {
      ...accountDto.account,
      ...{
        balance: {
          amount: Number(amountBalance.toFixed(2)),
          currency: accountDto.account.balance.currency,
        },
      },
    };
  }
}
