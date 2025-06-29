import { Controller, Get, Post, Body, UseGuards, ForbiddenException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { WalletService } from './wallet.service';
import { WalletDto } from './dto/wallet.dto';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { GetUser } from '@auth/decorators/get-user.decorator';
import { TopUpDto } from './dto/topup.dto';

@ApiTags('wallet')
@Controller('wallet')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get current user\'s wallet' })
  @ApiResponse({ status: 200, description: 'Returns the current user\'s wallet', type: WalletDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Wallet not found' })
  getMyWallet(@GetUser('id') userId: string): Promise<WalletDto> {
    return this.walletService.getWalletByUserId(userId);
  }

  @Post('topup')
  @ApiOperation({ 
    summary: 'Top up wallet balance (Development only)',
    description: 'Add funds to the wallet. This endpoint is only available in development environment.'
  })
  @ApiResponse({ status: 200, description: 'Wallet topped up successfully', type: WalletDto })
  @ApiResponse({ status: 400, description: 'Invalid amount' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Production environment' })
  @ApiResponse({ status: 404, description: 'Wallet not found' })
  async topUp(
    @GetUser('id') userId: string,
    @Body() topUpDto: TopUpDto,
  ): Promise<WalletDto> {
    // Only allow in development
    if (this.configService.get('NODE_ENV') !== 'development') {
      throw new ForbiddenException('This endpoint is only available in development environment');
    }

    return this.walletService.topUp(userId, topUpDto.amount);
  }
}
