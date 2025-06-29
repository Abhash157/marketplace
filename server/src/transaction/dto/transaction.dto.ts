import { ApiProperty } from '@nestjs/swagger';

export class TransactionDto {
  @ApiProperty({ description: 'Transaction ID' })
  id: string;

  @ApiProperty({ description: 'Wallet ID' })
  walletId: string;

  @ApiProperty({ description: 'Transaction amount' })
  amount: number;

  @ApiProperty({ description: 'Transaction description' })
  description: string;

  @ApiProperty({ description: 'Transaction timestamp' })
  createdAt: Date;

  @ApiProperty({ 
    description: 'Transaction type',
    enum: ['DEBIT', 'CREDIT'],
    required: true 
  })
  type: 'DEBIT' | 'CREDIT';
}
