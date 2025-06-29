import { Controller, Post, Body, HttpCode, HttpStatus, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RegisterDto } from '@auth/dto/register.dto';
import { LoginDto } from '@auth/dto/login.dto';
import { AuthResponseDto } from '@auth/dto/auth-response.dto';
import { UserDto } from '@auth/dto/user.dto';
import { UnauthorizedException } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from '@auth/auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered', type: AuthResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Email already in use' })
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<{ user: UserDto }> {
    const authData = await this.authService.signup(dto);
    
    // Set HttpOnly cookie
    res.cookie('access_token', authData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });
    
    return { user: authData.user };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'User successfully logged in', type: AuthResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<{ user: UserDto }> {
    const authData = await this.authService.login(dto);
    
    // Set HttpOnly cookie
    res.cookie('access_token', authData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });
    
    return { user: authData.user };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({ status: 200, description: 'User successfully retrieved', type: UserDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async me(@Req() req: Request): Promise<UserDto> {
    if (!req.user) {
      throw new UnauthorizedException('User not found');
    }
    return req.user as UserDto;
  }
}
