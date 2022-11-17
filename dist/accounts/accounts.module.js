"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsModule = void 0;
const common_1 = require("@nestjs/common");
const accounts_controller_1 = require("./accounts.controller");
const accounts_service_1 = require("./accounts.service");
const tables_database_1 = require("../core/database/tables.database");
const repository_1 = require("../repositories/repository");
const swyft_session_session_1 = require("../core/sessions/swyft-session.session");
let AccountsModule = class AccountsModule {
};
AccountsModule = __decorate([
    (0, common_1.Module)({
        controllers: [accounts_controller_1.AccountsController],
        providers: [accounts_service_1.AccountsService, tables_database_1.Table, repository_1.Repository, swyft_session_session_1.SwyftSession],
        exports: [accounts_service_1.AccountsService],
    })
], AccountsModule);
exports.AccountsModule = AccountsModule;
//# sourceMappingURL=accounts.module.js.map