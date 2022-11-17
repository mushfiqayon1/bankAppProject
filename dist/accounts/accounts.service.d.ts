import { CreateAccountDto } from './dto/create-account.dto';
import { Repository } from '../repositories/repository';
import { Table } from '../core/database/tables.database';
export declare class AccountsService {
    private repository;
    private readonly tables;
    constructor(repository: Repository, tables: Table);
    createAccount(createAccountDto: CreateAccountDto): any;
}
