import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { Table } from '../core/database/tables.database';
import { Repository } from '../repositories/repository';
import { SwyftSession } from '../core/sessions/swyft-session.session';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService, Table, Repository, SwyftSession],
  exports: [AccountsService],
})
export class AccountsModule {}

//session explain
//account controller
//
