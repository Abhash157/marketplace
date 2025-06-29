import { Exclude } from 'class-transformer';

export class UserDto {
  id: string;
  email: string;
  name: string;
  createdAt: Date;

  @Exclude()
  password: string;
}
