import { ValidationPipe } from '@nestjs/common';

export const getValidationPipe = () => {
  return new ValidationPipe({
    forbidNonWhitelisted: true,
    whitelist: true,
  });
};
