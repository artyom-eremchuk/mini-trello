import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CryptoService } from '../crypto/crypto.service';
import { CreateUserDto } from './dto/create-user.dto';
import { EMAIL } from 'src/config/constants/errors';

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

  async checkDuplicateByEmail(email: string) {
    const duplicate = await this.userRepository.findOne({
      where: { email },
    });

    if (duplicate) {
      throw new ConflictException(EMAIL.EXIST);
    }
  }

  async getPasswordHash(password: string) {
    return this.cryptoService.hash(password);
  }
}
