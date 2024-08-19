import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Patch,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto.';
import { UserFromRequest } from 'src/interfaces/user-from-request.interface';
import { GetUser } from 'src/decorators/get-user.decorator';

@Controller('lists')
@UseGuards(AuthGuard)
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Get()
  async getAll() {
    return this.listsService.getAll();
  }

  @Get(':id')
  async getListById(@Param('id', ParseIntPipe) id: number) {
    return this.listsService.getById(id);
  }

  @Post()
  async create(
    @Body() dto: CreateListDto,
    @GetUser() userFromRequest: UserFromRequest,
  ) {
    return this.listsService.create(dto, userFromRequest);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateListDto,
    @GetUser() userFromRequest: UserFromRequest,
  ) {
    return this.listsService.update(id, dto, userFromRequest);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() userFromRequest: UserFromRequest,
  ) {
    return this.listsService.delete(id, userFromRequest);
  }
}
