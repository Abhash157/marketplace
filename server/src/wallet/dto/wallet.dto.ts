import { ApiProperty } from '@nestjs/swagger';

export class WalletDto {
  id: string;
  balance: number;
  userId: string;
}
