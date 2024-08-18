import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto.';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/entities/user.entity';
import { USER } from 'src/config/constants/errors';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

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

  async login(dto: LoginDto): Promise<{ accessToken: string; user: User }> {
    const user = await this.usersService.getOne({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException(USER.NOT_FOUND);
    }

    await this.usersService.checkPassword(user.id, dto.password);

    const poyload = {
      userId: user.id,
    };

    const secret = this.configService.getOrThrow('ACCESS_TOKEN_SECRET');

    const expiresIn = this.configService.getOrThrow('ACCESS_TOKEN_LIFETIME');

    const accessToken = await this.jwtService.signAsync(poyload, {
      secret,
      expiresIn,
    });

    return {
      accessToken,
      user: user,
    };
  }
}
