"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const accounts_module_1 = require("./accounts/accounts.module");
const transactions_module_1 = require("./transactions/transactions.module");
const transactions_service_1 = require("./transactions/transactions.service");
const transactions_controller_1 = require("./transactions/transactions.controller");
const database_module_1 = require("./core/database/database.module");
const repository_module_1 = require("./repositories/repository.module");
const swyft_session_module_1 = require("./core/sessions/swyft-session.module");
const accounts_service_1 = require("./accounts/accounts.service");
const accounts_controller_1 = require("./accounts/accounts.controller");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            accounts_module_1.AccountsModule,
            transactions_module_1.TransactionsModule,
            database_module_1.DatabaseModule,
            repository_module_1.RepositoryModule,
            swyft_session_module_1.SwyftSesssionModule,
        ],
        controllers: [accounts_controller_1.AccountsController, transactions_controller_1.TransactionsController],
        providers: [accounts_service_1.AccountsService, transactions_service_1.TransactionsService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map