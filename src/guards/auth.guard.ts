import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IncomingHttpHeaders } from 'http';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TOKEN } from 'src/config/constants/errors';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractToken(request.headers);
    const secret = this.configService.getOrThrow('ACCESS_TOKEN_SECRET');

    try {
      const verifiedUser = await this.jwtService.verifyAsync(token, { secret });

      request['user'] = verifiedUser;
    } catch (error) {
      throw new UnauthorizedException(TOKEN.INVALID);
    }

    return true;
  }

  private extractToken(headers: IncomingHttpHeaders): string | undefined {
    const [type, token] = headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
