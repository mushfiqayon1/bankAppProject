import {
  ConflictException,
  InternalServerErrorException,
  Injectable,
} from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './dto/entities/account.entity';
import { Repository } from '../repositories/repository';
import { Table } from '../core/database/tables.database';
import { AccountMapper } from './mappers/account.map';

@Injectable()
export class AccountsService {
  constructor(private repository: Repository, private readonly tables: Table) {}
  // private accounts: Account[] = [
  //   { id: 1, name: 'Ayon' },
  //   { id: 2, name: 'Zaheen' },
  // ];

  // findAllAccounts() {
  //   return this.accounts;
  // }

  // findSpecificAccount(accountID: number) {
  //   return this.accounts.find((account) => account.id === accountID);
  // }

  createAccount(createAccountDto: CreateAccountDto) {
    try {
      const findKey = this.repository.findByKey(this.tables.ACCOUNTS, {
        key: 'email_address',
        id: createAccountDto.email_address,
      });

      if (!Array.isArray(findKey)) {
        const result = this.repository.insert(
          this.tables.ACCOUNTS,
          AccountMapper.toDomain({ ...createAccountDto }),
        );

        if (result) {
          return { result: true, message: 'Account created succesfully' };
        } else {
          throw new InternalServerErrorException(
            'An error occurred while trying to create account. Please try again!',
          );
        }
      } else {
        throw new ConflictException({
          messag: `An account already exists for the user with email ${createAccountDto.email_address}`,
        });
      }
    } catch (error) {
      console.log('Fix the error');
      console.log(error);
      return error;
    }
  }
}
