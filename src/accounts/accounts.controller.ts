import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Body,
  ParseUUIDPipe,
} from "@nestjs/common";
import { AccountsService } from "./accounts.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateAccountDto } from "./dto/create-account.dto";
import { UpdateAccountDto } from "./dto/update-account.dto";
import { CreateTransactionDto } from "src/transactions/dto/create-transaction.dto";
import { DepositTransactionDto } from "src/transactions/dto/deposit-transaction.dto";
import { WithdrawTransactionDto } from "../transactions/dto/withdraw-transaction.dto";

@ApiTags("Account")
@Controller("accounts")
export class AccountsController {
  // quering logic should be in the service
  //need to add the constructor
  constructor(private accountsService: AccountsService) {
    // Whats happening here: Accounts service controller is saying I want AccountsService to be automatically injected into this controller and nest is doing that in the backgroud
  }

  /* POST /accounts/
    Creating the account*/
  @Post()
  createAccount(@Body() body: CreateAccountDto): any {
    //return account;
    return this.accountsService.createAccount(body);
  }

  /* GET /accounts/
     retrive all accounts infromation */
  @Get()
  findAllAccounts() {
    // note: here any is a return type
    //return all accounts;
    return this.accountsService.findAllAccounts();
  }

  /*GET /accounts/{id}
   specific account information */
  @Get(":id")
  async findOneAccount(@Param("id") accountId: string) {
    //return specificAccount;
    return this.accountsService.findOneAccount(accountId);
  }

  //GET /accounts/{accountId}/transactions
  @Get(":id/transactions/")
  findOneTransaction(@Param("id") accountId: string) {
    //retrun transactrion for one specific account;
    return this.accountsService.findOneTransaction(accountId);
  }

  //POST /accounts/{accountId}/transactions/add
  // Create a transaction to add money in the syetem for a specific account
  @Post(":id/transactions/add")
  async addMoneyToAccount(
    @Param("id") accountId: string,
    @Body() addTransactionDto: DepositTransactionDto
  ) {
    //return add money to a specific account and update the balance
    return this.accountsService.addMoneyToAccount(accountId, {
      ...addTransactionDto,
    });
  }

  //POST /accounts/{accountId}/transactions/withdraw
  // Create a transaction to withdrawmoney from a specific account
  @Post(":id/transactions/withdraw")
  withdrawMoneyFromAccount(
    @Param("id") accountId: string,
    @Body() withdrawTransactionDto: WithdrawTransactionDto
  ) {
    //retrun the updated account
    return this.accountsService.withdrawMoneyFromAccount(
      accountId,
      withdrawTransactionDto
    );
  }

  //POST /accounts/{accountId}/transactions/send
  //create a function that will send money to an account and update the balance of the current account
  @Post(":id/transactions/send")
  sendMoneyToAccount(
    @Param("id") accountId: string,
    @Body() createTransactionDto: CreateTransactionDto
  ) {
    //retun the updated account and and the receiverAccount
    return this.accountsService.sendMoneyToAccount(
      accountId,
      createTransactionDto
    );
  }

  //Update specific account with new balance/transaction
  @Patch(":id")
  updateAccount(
    @Param("id") accountId: string,
    @Body() updateAccountDto: UpdateAccountDto
  ) {
    //return specific newly updated account
    return this.accountsService.updateAccount(accountId, updateAccountDto);
  }
}
