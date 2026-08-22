import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'crypto';
import { User, UserRole } from '../users/entities/user.entity';

type TokenPayload = { sub: string; role: UserRole; exp: number };

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
    return {
      accessToken: this.signToken({
        sub: user.id,
        role: user.role,
        exp: Date.now() + 15 * 60 * 1000,
      }),
      refreshToken: this.signToken({
        sub: user.id,
        role: user.role,
        exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
      }),
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

  signToken(payload: TokenPayload) {
    const header = Buffer.from(
      JSON.stringify({ alg: 'HS256', typ: 'JWT' }),
    ).toString('base64url');
    const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const secret = process.env.JWT_ACCESS_SECRET ?? 'dev-secret';
    const sig = createHmac('sha256', secret)
      .update(`${header}.${body}`)
      .digest('base64url');
    return `${header}.${body}.${sig}`;
  }

  verifyToken(token: string): TokenPayload {
    const [header, body, sig] = token.split('.');
    if (!header || !body || !sig) throw new UnauthorizedException();
    const secret = process.env.JWT_ACCESS_SECRET ?? 'dev-secret';
    const expected = createHmac('sha256', secret)
      .update(`${header}.${body}`)
      .digest('base64url');
    if (expected !== sig) throw new UnauthorizedException();
    const payload = JSON.parse(
      Buffer.from(body, 'base64url').toString('utf8'),
    ) as TokenPayload;
    if (payload.exp < Date.now()) throw new UnauthorizedException();
    return payload;
  }
}
