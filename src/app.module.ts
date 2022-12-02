import { Module } from "@nestjs/common";
import { AccountsModule } from "./accounts/accounts.module";
import { TransactionsModule } from "./transactions/transactions.module";
import { TransactionsService } from "./transactions/transactions.service";
import { TransactionsController } from "./transactions/transactions.controller";
import { DatabaseModule } from "./essentials/database/database.module";
import { RepositoryModule } from "./repositories/repository.module";
import { BankSesssionModule } from "./essentials/sessions/bankSession.module";
import { AccountsService } from "./accounts/accounts.service";
import { AccountsController } from "./accounts/accounts.controller";

@Module({
  imports: [
    AccountsModule,
    TransactionsModule,
    DatabaseModule,
    RepositoryModule,
    BankSesssionModule,
  ],
  controllers: [AccountsController, TransactionsController],
  providers: [AccountsService, TransactionsService],
})
export class AppModule {}
