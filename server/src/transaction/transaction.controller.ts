import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { GetUser } from '@auth/decorators/get-user.decorator';
import { TransactionService } from './transaction.service';
import { TransactionDto } from './dto/transaction.dto';

@ApiTags('transactions')
@Controller('transactions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('transfer')
  @ApiOperation({ summary: 'Transfer funds to another user' })
  @ApiResponse({ 
    status: 201, 
    description: 'Transfer completed successfully',
    type: TransactionDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Insufficient balance' })
  @ApiResponse({ status: 404, description: 'Recipient not found' })
  async transfer(
    @GetUser('id') userId: string,
    @Body() transactionDto: TransactionDto,
  ): Promise<{ transaction: TransactionDto }> {
    return this.transactionService.createTransaction(
      transactionDto.walletId,
      transactionDto.amount,
      transactionDto.type,
      transactionDto.description
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get user transaction history' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns user transactions',
    schema: {
      type: 'object',
      properties: {
        sent: { type: 'array', items: { $ref: '#/components/schemas/TransactionDto' } },
        received: { type: 'array', items: { $ref: '#/components/schemas/TransactionDto' } },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getTransactions(
    @GetUser('id') userId: string,
  ): Promise<{ sent: TransactionDto[]; received: TransactionDto[] }> {
    return this.transactionService.getUserTransactions(userId);
  }
}
