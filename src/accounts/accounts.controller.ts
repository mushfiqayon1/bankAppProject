import { Controller, Get, Param, Patch, Post, Body } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './dto/entities/account.entity';

@ApiTags('Account')
@Controller('accounts')
export class AccountsController {
  // quering logic should be in the service
  //need to add the constructor
  constructor(private accountsService: AccountsService) {
    // Whats happening here: Accounts service controller is saying I want AccountsService to be automatically injected into this controller and nest is doing that in the backgroud
  }

  //POST /accounts/
  //Creating the account
  @Post()
  createAccount(@Body() body: CreateAccountDto): any {
    //return account;
    return this.accountsService.createAccount(body);
  }

  //GET /accounts/
  //retrive all accounts infromation
  // @Get()
  // findAllAccounts(): Account[] {
  //   // note: here any is a return type
  //   //return all accounts;
  //   // return this.accountsService.findAllAccounts();
  // }

  //GET /accounts/{id}
  //specific account information
  // @Get(':id')
  // findSpecificAccount(@Param('id') accountId: string): Account {
  //   //return specificAccount;
  //   // return this.accountsService.findSpecificAccount(Number(accountId));
  // }

  //GET /transactions
  //retrive all a list of all transactions across all accounts in the system
  @Get()
  findAllTransactions() {
    //return all the transactions for all the accounts
  }

  //GET /accounts/{accountId}/transactions
  @Get(':id/transactions/')
  findSpecificTransaction() {
    //retrun transactrion for one specific account;
  }

  //POST /accounts/{accountId}/transactions/add
  // Create a transaction to add money in the syetem for a specific account
  @Post(':id/transactions/add')
  addMoneyToAccount() {
    //return add money to a specific account and update the balance
  }

  //POST /accounts/{accountId}/transactions/withdraw
  // Create a transaction to withdrawmoney from a specific account
  @Post(':id/transactions/withdraw')
  withdrawMoneyFromAccount() {
    //retrun the updated account
  }

  //POST /accounts/{accountId}/transactions/send
  //create a function that will send money to an account and update the balance of the current account
  @Post(':id/transactions/send')
  sendMoneyToAccount() {
    //retun the updated account and and the receiverAccount
  }

  //Update specific account with new balance/transaction
  @Patch(':id')
  updateAccount() {
    //return specific newly updated account
  }
}
