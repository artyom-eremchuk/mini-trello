import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { USER } from 'src/config/constants/errors';
import { UserFromRequest } from 'src/interfaces/user-from-request.interface';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.user) {
      throw new InternalServerErrorException(USER.NOT_FOUND_IN_REQUEST);
    }

    return request.user as UserFromRequest;
  },
);
