import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { WalletDto } from './dto/wallet.dto';

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService) {}

  async createWallet(userId: string): Promise<WalletDto> {
    // First check if user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Then create wallet
    const wallet = await this.prisma.wallet.create({
      data: {
        user: {
          connect: { id: userId },
        },
        balance: 0,
      },
    });

    return {
      id: wallet.id,
      balance: wallet.balance,
      userId: wallet.userId,
    };
  }

  async getWalletByUserId(userId: string): Promise<WalletDto> {
    const userWithWallet = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { wallet: true },
    });

    if (!userWithWallet?.wallet) {
      throw new NotFoundException('Wallet not found');
    }

    const wallet = userWithWallet.wallet;
    return {
      id: wallet.id,
      balance: wallet.balance,
      userId: wallet.userId,
    };
  }

  async topUp(userId: string, amount: number): Promise<WalletDto> {
    if (amount <= 0) {
      throw new ForbiddenException('Amount must be greater than 0');
    }

    // Update the wallet balance through the user relation
    const userWithWallet = await this.prisma.user.update({
      where: { id: userId },
      data: {
        wallet: {
          update: {
            balance: {
              increment: amount,
            },
          },
        },
      },
      include: {
        wallet: true,
      },
    });

    if (!userWithWallet?.wallet) {
      throw new NotFoundException('Wallet not found');
    }

    const wallet = userWithWallet.wallet;
    return {
      id: wallet.id,
      balance: wallet.balance,
      userId: wallet.userId,
    };
  }
}
