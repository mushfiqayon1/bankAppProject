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
const tables_database_1 = require("../core/database/tables.database");
const account_map_1 = require("./mappers/account.map");
let AccountsService = class AccountsService {
    constructor(repository, tables) {
        this.repository = repository;
        this.tables = tables;
    }
    createAccount(createAccountDto) {
        try {
            const findKey = this.repository.findByKey(this.tables.ACCOUNTS, {
                key: 'email_address',
                id: createAccountDto.email_address,
            });
            if (!Array.isArray(findKey)) {
                const result = this.repository.insert(this.tables.ACCOUNTS, account_map_1.AccountMapper.toDomain(Object.assign({}, createAccountDto)));
                if (result) {
                    return { result: true, message: 'Account created succesfully' };
                }
                else {
                    throw new common_1.InternalServerErrorException('An error occurred while trying to create account. Please try again!');
                }
            }
            else {
                throw new common_1.ConflictException({
                    messag: `An account already exists for the user with email ${createAccountDto.email_address}`,
                });
            }
        }
        catch (error) {
            console.log('Fix the error');
            console.log(error);
            return error;
        }
    }
};
AccountsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.Repository, tables_database_1.Table])
], AccountsService);
exports.AccountsService = AccountsService;
//# sourceMappingURL=accounts.service.js.map