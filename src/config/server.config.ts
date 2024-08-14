import { registerAs } from '@nestjs/config';

export interface ServerConfig {
  port: number;
}

export const ServerConfigName = 'server';

export default registerAs(ServerConfigName, () => ({
  port: parseInt(process.env.APP_PORT || '3000'),
}));
