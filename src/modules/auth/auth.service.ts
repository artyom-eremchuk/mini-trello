import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto.';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(dto: RegisterDto): Promise<User> {
    const hashedPassword = await this.usersService.getPasswordHash(
      dto.password,
    );

    const user = await this.usersService.create({
      email: dto.email,
      password: hashedPassword,
    });

    user.password = undefined;

    return user;
  }
}
