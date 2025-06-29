import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '@user/user.service';
import { UserDto } from '@user/dto/user.dto';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { GetUser } from '@auth/decorators/get-user.decorator';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Returns the current user profile', type: UserDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getCurrentUser(@GetUser('id') userId: string): Promise<UserDto> {
    console.log('entered users/me');
    return this.userService.getUserById(userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Returns all users', type: [UserDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getUsers(): Promise<UserDto[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'Returns the user with the specified ID', type: UserDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getUserById(@Param('id') id: string): Promise<UserDto> {
    return this.userService.getUserById(id);
  }
}
