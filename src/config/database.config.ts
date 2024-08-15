import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const DatabaseConfigName = 'database';

export default registerAs(
  DatabaseConfigName,
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PWD || 'password',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || 'mini-trello',
    autoLoadEntities: true,
    synchronize: true,
    logging: 'all',
    entities: ['dist/modules/**/*.entity.js'],
  }),
);
