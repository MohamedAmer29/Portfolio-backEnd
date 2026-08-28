import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'crypto';
import { User, UserRole } from '../users/entities/user.entity';

type AccessTokenClaims = {
  sub: string;
  role: UserRole;
  exp: number;
  type: 'access';
  tokenVersion: number;
};

type RefreshTokenClaims = {
  sub: string;
  role: UserRole;
  exp: number;
  type: 'refresh';
  sessionId: string;
  tokenVersion: number;
};

export type AuthPrincipal = {
  sub: string;
  role: UserRole;
  tokenVersion: number;
};

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async ensureAdminSeeded(email: string, password: string) {
    const existing = await this.users.findOneBy({ email });
    if (existing) return existing;
    const user = this.users.create({
      email,
      passwordHash: this.hashPassword(password),
      role: UserRole.ADMIN,
      isActive: true,
      emailVerified: true,
    });
    return this.users.save(user);
  }

  async login(email: string, password: string) {
    const user = await this.users.findOneBy({ email });
    if (
      !user ||
      !user.isActive ||
      !this.verifyPassword(password, user.passwordHash)
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const sessionId = randomBytes(16).toString('hex');
    user.currentRefreshTokenId = sessionId;
    user.currentRefreshTokenExpiresAt = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000,
    );
    await this.users.save(user);

    const accessToken = this.signToken(
      {
        sub: user.id,
        role: user.role,
        exp: Date.now() + 15 * 60 * 1000,
        type: 'access',
        tokenVersion: user.tokenVersion,
      },
      this.accessSecret,
    );
    const refreshToken = this.signToken(
      {
        sub: user.id,
        role: user.role,
        exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
        type: 'refresh',
        sessionId,
        tokenVersion: user.tokenVersion,
      },
      this.refreshSecret,
    );
    return {
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email, role: user.role },
    };
  }

  async me(userId: string) {
    const user = await this.users.findOneBy({ id: userId });
    if (!user) throw new UnauthorizedException();
    return { id: user.id, email: user.email, role: user.role };
  }

  async requireAdmin(userId: string) {
    const user = await this.users.findOneBy({ id: userId });
    if (!user || !user.isActive || user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Admin access required');
    }
    return user;
  }

  hashPassword(password: string) {
    const salt = randomBytes(16).toString('hex');
    const derived = scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${derived}`;
  }

  verifyPassword(password: string, hash: string) {
    const [salt, derived] = hash.split(':');
    if (!salt || !derived) return false;
    let next: Buffer;
    try {
      next = scryptSync(password, salt, 64);
    } catch {
      return false;
    }
    const expected = Buffer.from(derived, 'hex');
    if (expected.length !== next.length) return false;
    return timingSafeEqual(expected, next);
  }

  private get accessSecret(): string {
    return process.env.JWT_ACCESS_SECRET ?? 'dev-secret';
  }

  private get refreshSecret(): string {
    return (
      process.env.JWT_REFRESH_SECRET ??
      process.env.JWT_ACCESS_SECRET ??
      'dev-refresh-secret'
    );
  }

  signToken(payload: Record<string, unknown>, secret: string): string {
    const header = Buffer.from(
      JSON.stringify({ alg: 'HS256', typ: 'JWT' }),
    ).toString('base64url');
    const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const sig = createHmac('sha256', secret)
      .update(`${header}.${body}`)
      .digest('base64url');
    return `${header}.${body}.${sig}`;
  }

  private verifySignature(token: string, secret: string): Record<string, any> {
    const [header, body, sig] = token.split('.');
    if (!header || !body || !sig) throw new UnauthorizedException();
    const expected = createHmac('sha256', secret)
      .update(`${header}.${body}`)
      .digest('base64url');
    if (expected !== sig) throw new UnauthorizedException('Invalid token');
    const payload = JSON.parse(
      Buffer.from(body, 'base64url').toString('utf8'),
    ) as Record<string, any>;
    if (typeof payload.exp === 'number' && payload.exp < Date.now()) {
      throw new UnauthorizedException('Token expired');
    }
    return payload;
  }

  async verifyAccessToken(token: string): Promise<AuthPrincipal> {
    const payload = this.verifySignature(
      token,
      this.accessSecret,
    ) as AccessTokenClaims;
    if (payload.type !== 'access') {
      throw new UnauthorizedException('Invalid token type');
    }
    const user = await this.users.findOneBy({ id: payload.sub });
    if (!user || !user.isActive) {
      throw new UnauthorizedException('Account is not active');
    }
    if (user.tokenVersion !== payload.tokenVersion) {
      throw new UnauthorizedException('Session expired, please log in again');
    }
    return { sub: user.id, role: user.role, tokenVersion: user.tokenVersion };
  }

  async verifyRefreshToken(token: string) {
    const payload = this.verifySignature(
      token,
      this.refreshSecret,
    ) as RefreshTokenClaims;
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
    return {
      sub: user.id,
      email: user.email,
      role: user.role,
      sessionId: payload.sessionId,
      tokenVersion: user.tokenVersion,
    };
  }

  async refresh(userId: string, role: UserRole) {
    const user = await this.users.findOneBy({ id: userId });
    if (!user || !user.isActive) {
      throw new UnauthorizedException('Account is not active');
    }

    const sessionId =
      user.currentRefreshTokenId ?? randomBytes(16).toString('hex');
    if (!user.currentRefreshTokenId) {
      user.currentRefreshTokenId = sessionId;
      user.currentRefreshTokenExpiresAt = new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000,
      );
      await this.users.save(user);
    }

    const accessToken = this.signToken(
      {
        sub: user.id,
        role: user.role,
        exp: Date.now() + 15 * 60 * 1000,
        type: 'access',
        tokenVersion: user.tokenVersion,
      },
      this.accessSecret,
    );
    const refreshToken = this.signToken(
      {
        sub: user.id,
        role: user.role,
        exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
        type: 'refresh',
        sessionId,
        tokenVersion: user.tokenVersion,
      },
      this.refreshSecret,
    );
    return { accessToken, refreshToken };
  }

  async logout(refreshToken?: string): Promise<{ success: boolean }> {
    if (!refreshToken) {
      throw new ForbiddenException('Not logged in. Please log in again.');
    }
    let payload: { sub: string; tokenVersion: number } | undefined;
    try {
      payload = await this.verifyRefreshToken(refreshToken);
    } catch {
      throw new ForbiddenException('Not logged in. Please log in again.');
    }
    const user = await this.users.findOneBy({ id: payload.sub });
    if (!user || !user.isActive) {
      throw new ForbiddenException('Not logged in. Please log in again.');
    }
    user.tokenVersion = (user.tokenVersion ?? 0) + 1;
    user.currentRefreshTokenId = null;
    user.currentRefreshTokenExpiresAt = null;
    await this.users.save(user);
    return { success: true };
  }

  async verifyToken(token: string): Promise<AuthPrincipal> {
    return this.verifyAccessToken(token);
  }
}
