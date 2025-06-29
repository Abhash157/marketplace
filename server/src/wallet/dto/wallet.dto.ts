import { ApiProperty } from '@nestjs/swagger';

export class WalletDto {
  @ApiProperty({ description: 'The unique identifier of the wallet' })
  id: string;

  @ApiProperty({ description: 'The current balance of the wallet' })
  balance: number;

  @ApiProperty({ description: 'The ID of the user who owns this wallet' })
  userId: string;

  @ApiProperty({ description: 'The date and time when the wallet was created' })
  createdAt: Date;
}
