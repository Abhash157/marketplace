import { IsNumber, IsPositive, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TransferDto {
  @ApiProperty({
    description: 'Email of the recipient',
    example: 'recipient@example.com',
  })
  @IsString()
  recipientEmail: string;

  @ApiProperty({
    description: 'Amount to transfer',
    minimum: 0.01,
    example: 100.50,
  })
  @IsNumber()
  @IsPositive()
  @Min(0.01)
  amount: number;
}
