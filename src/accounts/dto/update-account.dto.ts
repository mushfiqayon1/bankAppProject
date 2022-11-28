import { ApiProperty } from "@nestjs/swagger";

export class UpdateAccountDto {
  @ApiProperty()
  readonly given_name?: string;

  @ApiProperty()
  readonly family_name?: string;

  @ApiProperty()
  readonly email_address?: string;

  @ApiProperty()
  readonly note?: string;
}
