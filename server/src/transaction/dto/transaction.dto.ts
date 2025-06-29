import { ApiProperty } from '@nestjs/swagger';

export class TransactionDto {
  @ApiProperty({ description: 'Transaction ID' })
  id: string;

  @ApiProperty({ description: 'Sender user ID' })
  senderId: string;

  @ApiProperty({ description: 'Recipient user ID' })
  receiverId: string;

  @ApiProperty({ description: 'Transaction amount' })
  amount: number;

  @ApiProperty({ description: 'Transaction timestamp' })
  createdAt: Date;

  @ApiProperty({ 
    description: 'Transaction type',
    enum: ['DEBIT', 'CREDIT'],
    required: false 
  })
  type?: 'DEBIT' | 'CREDIT';
}
