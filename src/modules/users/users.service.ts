import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CryptoService } from '../crypto/crypto.service';
import { CreateUserDto } from './dto/create-user.dto';
import { EMAIL, USER } from 'src/config/constants/errors';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly cryptoService: CryptoService,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    await this.checkDuplicateByEmail(dto.email);

    return this.userRepository.save({ ...dto });
  }

  async getOne(options: FindOneOptions<User>): Promise<User> {
    return this.userRepository.findOne(options);
  }

  async getOneFull(options: FindOneOptions<User>): Promise<User> {
    return this.getOne({
      ...options,
      select: ['id', 'email', 'password'],
    });
  }

  async checkDuplicateByEmail(email: string) {
    const duplicate = await this.getOne({
      where: { email },
    });

    if (duplicate) {
      throw new ConflictException(EMAIL.EXIST);
    }
  }

  async getPasswordHash(password: string) {
    return this.cryptoService.hash(password);
  }

  async checkPassword(userId: string, password: string) {
    const user = await this.getOneFull({
      where: { id: userId },
    });

    const success = await this.cryptoService.compare(password, user.password);

    if (!success) {
      throw new UnauthorizedException(USER.BAD_PASSWORD);
    }
  }
}
