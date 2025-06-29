// src/transaction/transaction.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionDto } from './dto/transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async createTransaction(
    walletId: string,
    amount: number,
    type: 'DEBIT' | 'CREDIT',
    description: string,
  ): Promise<{ transaction: TransactionDto }> {
    const transaction = await this.prisma.transaction.create({
      data: {
        type,
        amount,
        description,
        wallet: { connect: { id: walletId } },
      },
    });

    return {
      transaction: {
        id: transaction.id,
        type,
        amount: transaction.amount,
        description: transaction.description,
        createdAt: transaction.createdAt,
        walletId: transaction.walletId,
      },
    };
  }

  async getUserTransactions(
    userId: string,
  ): Promise<{ sent: TransactionDto[]; received: TransactionDto[] }> {
    const wallet = await this.prisma.wallet.findUnique({
      where: { userId },
      include: {
        history: {
          orderBy: { createdAt: 'desc' },
          include: {
            wallet: true,
          },
        },
      },
    });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    const sent = wallet.history
      .filter((history) => history.type === 'DEBIT')
      .map((history) => ({
        id: history.id,
        type: 'DEBIT' as const,
        amount: history.amount,
        description: history.description,
        createdAt: history.createdAt,
        walletId: history.walletId,
      }));

    const received = wallet.history
      .filter((history) => history.type === 'CREDIT')
      .map((history) => ({
        id: history.id,
        type: 'CREDIT' as const,
        amount: history.amount,
        description: history.description,
        createdAt: history.createdAt,
        walletId: history.walletId,
      }));

    return { sent, received };
  }
}