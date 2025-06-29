import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { WalletService } from '@wallet/wallet.service';
import { RegisterDto } from '@auth/dto/register.dto';
import { LoginDto } from '@auth/dto/login.dto';
import { AuthResponseDto } from '@auth/dto/auth-response.dto';



@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private walletService: WalletService,
  ) {}

  async signup(dto: RegisterDto): Promise<AuthResponseDto> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(dto.password, salt);

    try {
      // Create user first
      // Create user with explicit type for the select
      const user = await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hash,
        },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          createdAt: true,
        } as const,
      });

      // Create wallet for the user
      await this.walletService.createWallet(user.id);

      // Generate JWT token
      const access_token = await this.signToken(user.id, user.email);

      return {
        access_token,
        user: {
          name: user.name,
          id: user.id,
          email: user.email,
          createdAt: user.createdAt,
        },
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already in use');
        }
      }
      throw error;
    }
  }

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = dto;

    // Find the user by email
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        createdAt: true,
      } as const,
    });

    // Check if user exists
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const access_token = await this.signToken(user.id, user.email);

    // Return user data without password
    return {
      access_token,
      user: {
        name: user.name,
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      },
    };
  }

  private async signToken(userId: string, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };

    return this.jwt.signAsync(payload, {
      expiresIn: this.config.get('JWT_EXPIRATION') || '15m',
      secret: this.config.get('JWT_SECRET')!,
    });
  }
}
