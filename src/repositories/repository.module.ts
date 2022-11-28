import { Module } from "@nestjs/common";
import { Table } from "../essentials/database/tables.database";
import { Repository } from "./repository";

@Module({
  providers: [Repository, Table],
  exports: [Repository],
})
export class RepositoryModule {}
