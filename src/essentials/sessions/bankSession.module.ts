import { Module } from "@nestjs/common";
import { BankSession } from "./bankSession.session";

@Module({
  providers: [BankSession],
  exports: [BankSession],
})
export class BankSesssionModule {}
