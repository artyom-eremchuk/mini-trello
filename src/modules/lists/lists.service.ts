import { Repository } from 'typeorm';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto.';
import { UserFromRequest } from 'src/interfaces/user-from-request.interface';
import { List } from './entities/list.entity';
import { USER } from 'src/config/constants/errors';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List)
    private readonly listsRepository: Repository<List>,
  ) {}

  async getAll() {
    return await this.listsRepository.find();
  }

  async getById(id: number) {
    return await this.listsRepository.findOne({ where: { id } });
  }

  async create(dto: CreateListDto, userFromRequest: UserFromRequest) {
    return await this.listsRepository.save({
      title: dto.title,
      creatorId: userFromRequest.userId,
    });
  }

  async update(
    id: number,
    dto: UpdateListDto,
    userFromRequest: UserFromRequest,
  ) {
    const list = await this.listsRepository.findOne({
      where: { id },
    });

    if (list.creatorId !== userFromRequest.userId) {
      throw new ForbiddenException(USER.FORBIDDEN);
    }

    Object.assign(list, dto);

    return await this.listsRepository.save(list);
  }

  async delete(id: number, userFromRequest: UserFromRequest) {
    const list = await this.listsRepository.findOne({
      where: { id },
    });

    if (list.creatorId !== userFromRequest.userId) {
      throw new ForbiddenException(USER.FORBIDDEN);
    }

    return await this.listsRepository.delete(id);
  }
}
