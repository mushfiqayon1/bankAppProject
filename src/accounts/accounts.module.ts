import { Module } from "@nestjs/common";
import { AccountsController } from "./accounts.controller";
import { AccountsService } from "./accounts.service";
import { Table } from "../essentials/database/tables.database";
import { Repository } from "../repositories/repository";
import { BankSession } from "../essentials/sessions/bankSession.session";

@Module({
  controllers: [AccountsController],
  providers: [AccountsService, Table, Repository, BankSession],
  exports: [AccountsService],
})
export class AccountsModule {}

//session explain
//account controller
//
