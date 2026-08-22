import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import type { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { RefreshTokenPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh-token',
) {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request): string | null => {
          const token = req?.cookies?.['refresh_token'];
          return typeof token === 'string' ? token : null;
        },
      ]),
      secretOrKey:
        process.env.JWT_REFRESH_SECRET ??
        process.env.JWT_ACCESS_SECRET ??
        'dev-refresh-secret',
      ignoreExpiration: false,
    });
  }

  async validate(payload: RefreshTokenPayload) {
    if (payload.type !== 'refresh') {
      throw new UnauthorizedException('Invalid token type');
    }
    const user = await this.users.findOneBy({ id: payload.sub });
    if (!user || !user.isActive) {
      throw new UnauthorizedException('Account is not active');
    }
    if (user.tokenVersion !== payload.tokenVersion) {
      throw new UnauthorizedException('Session expired, please log in again');
    }
    if (
      user.currentRefreshTokenId &&
      user.currentRefreshTokenId !== payload.sessionId
    ) {
      throw new UnauthorizedException('Refresh token has been revoked');
    }
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      sessionId: payload.sessionId,
      tokenVersion: user.tokenVersion,
    };
  }
}
