import { Module } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { TransactionsController } from "./transactions.controller";
import { Table } from "../essentials/database/tables.database";
import { Repository } from "../repositories/repository";
import { DatabaseModule } from "src/essentials/database/database.module";
import { RepositoryModule } from "src/repositories/repository.module";

@Module({
  imports: [DatabaseModule, RepositoryModule],
  controllers: [TransactionsController],
  providers: [TransactionsService, Table, Repository],
  exports: [TransactionsService],
})
export class TransactionsModule {}
