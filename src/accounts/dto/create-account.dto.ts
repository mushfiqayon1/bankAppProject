import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class BalanceAttributes {
  @ApiProperty()
  currency: string;
  @ApiProperty()
  amount: number;
}
export class CreateAccountDto {
  @ApiProperty()
  given_name: string;

  @ApiProperty()
  family_name: string;

  @ApiProperty()
  email_address: string;

  @ApiProperty()
  note: string;

  @Type(() => BalanceAttributes)
  @ApiProperty()
  balance: BalanceAttributes;
}
