import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { TransferDto } from './dto/transfer.dto';
import { TransactionDto } from './dto/transaction.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async transferFunds(
    senderId: string,
    transferDto: TransferDto,
  ): Promise<{ transaction: TransactionDto }> {
    const { recipientEmail, amount } = transferDto;

    return this.prisma.$transaction(async (tx) => {
      // 1. Find recipient by email
      const recipient = await tx.user.findUnique({
        where: { email: recipientEmail },
      });

      if (!recipient) {
        throw new NotFoundException('Recipient not found');
      }

      if (senderId === recipient.id) {
        throw new ForbiddenException('Cannot transfer to yourself');
      }

      // 2. Check sender's balance
      const sender = await tx.user.findUnique({
        where: { id: senderId },
        include: { wallet: true },
      });

      if (!sender?.wallet) {
        throw new NotFoundException('Sender wallet not found');
      }

      if (sender.wallet.balance < amount) {
        throw new ForbiddenException('Insufficient balance');
      }

      // 3. Update sender's wallet (debit)
      await tx.wallet.update({
        where: { userId: senderId },
        data: { balance: { decrement: amount } },
      });

      // 4. Update recipient's wallet (credit)
      await tx.wallet.update({
        where: { userId: recipient.id },
        data: { balance: { increment: amount } },
      });

      // 5. Create transaction record
      const transaction = await tx.transaction.create({
        data: {
          amount,
          sender: { connect: { id: senderId } },
          receiver: { connect: { id: recipient.id } },
        },
      });

      return { transaction };
    });
  }

  async getUserTransactions(
    userId: string,
  ): Promise<{ sent: TransactionDto[]; received: TransactionDto[] }> {
    const [sent, received] = await Promise.all([
      this.prisma.transaction.findMany({
        where: { senderId: userId },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.transaction.findMany({
        where: { receiverId: userId },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      sent: sent.map(tx => ({
        ...tx,
        type: 'DEBIT' as const,
      })),
      received: received.map(tx => ({
        ...tx,
        type: 'CREDIT' as const,
      })),
    };
  }
}
