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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsController = void 0;
const common_1 = require("@nestjs/common");
const accounts_service_1 = require("./accounts.service");
const swagger_1 = require("@nestjs/swagger");
const create_account_dto_1 = require("./dto/create-account.dto");
const update_account_dto_1 = require("./dto/update-account.dto");
const create_transaction_dto_1 = require("../transactions/dto/create-transaction.dto");
const deposit_transaction_dto_1 = require("../transactions/dto/deposit-transaction.dto");
const withdraw_transaction_dto_1 = require("../transactions/dto/withdraw-transaction.dto");
let AccountsController = class AccountsController {
    constructor(accountsService) {
        this.accountsService = accountsService;
    }
    createAccount(body) {
        return this.accountsService.createAccount(body);
    }
    findAllAccounts() {
        return this.accountsService.findAllAccounts();
    }
    async findOneAccount(accountId) {
        return this.accountsService.findOneAccount(accountId);
    }
    findOneTransaction(accountId) {
        return this.accountsService.findOneTransaction(accountId);
    }
    async addMoneyToAccount(accountId, addTransactionDto) {
        return this.accountsService.addMoneyToAccount(accountId, Object.assign({}, addTransactionDto));
    }
    withdrawMoneyFromAccount(accountId, withdrawTransactionDto) {
        return this.accountsService.withdrawMoneyFromAccount(accountId, withdrawTransactionDto);
    }
    sendMoneyToAccount(accountId, createTransactionDto) {
        return this.accountsService.sendMoneyToAccount(accountId, createTransactionDto);
    }
    updateAccount(accountId, updateAccountDto) {
        return this.accountsService.updateAccount(accountId, updateAccountDto);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_account_dto_1.CreateAccountDto]),
    __metadata("design:returntype", Object)
], AccountsController.prototype, "createAccount", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AccountsController.prototype, "findAllAccounts", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "findOneAccount", null);
__decorate([
    (0, common_1.Get)(":id/transactions/"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AccountsController.prototype, "findOneTransaction", null);
__decorate([
    (0, common_1.Post)(":id/transactions/add"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, deposit_transaction_dto_1.DepositTransactionDto]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "addMoneyToAccount", null);
__decorate([
    (0, common_1.Post)(":id/transactions/withdraw"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, withdraw_transaction_dto_1.WithdrawTransactionDto]),
    __metadata("design:returntype", void 0)
], AccountsController.prototype, "withdrawMoneyFromAccount", null);
__decorate([
    (0, common_1.Post)(":id/transactions/send"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_transaction_dto_1.CreateTransactionDto]),
    __metadata("design:returntype", void 0)
], AccountsController.prototype, "sendMoneyToAccount", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_account_dto_1.UpdateAccountDto]),
    __metadata("design:returntype", void 0)
], AccountsController.prototype, "updateAccount", null);
AccountsController = __decorate([
    (0, swagger_1.ApiTags)("Account"),
    (0, common_1.Controller)("accounts"),
    __metadata("design:paramtypes", [accounts_service_1.AccountsService])
], AccountsController);
exports.AccountsController = AccountsController;
//# sourceMappingURL=accounts.controller.js.map