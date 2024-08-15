import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import serverConfig from './config/server.config';
import databaseConfig from './config/database.config';
import { getAllModules } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [serverConfig, databaseConfig],
    }),
    TypeOrmModule.forRoot(databaseConfig()),
    ...getAllModules(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
