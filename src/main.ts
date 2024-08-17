import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ServerConfig, ServerConfigName } from './config/server.config';
import { getValidationPipe } from './validation/validation-pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(getValidationPipe());
  app.setGlobalPrefix('mini-trello-api');

  const configService: ConfigService = app.get(ConfigService);
  const serverConfig = configService.getOrThrow<ServerConfig>(ServerConfigName);

  await app.listen(serverConfig.port);
}
bootstrap();
