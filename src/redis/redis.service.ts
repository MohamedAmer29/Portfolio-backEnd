import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';

type RedisClient = {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ...args: unknown[]): Promise<unknown>;
  del(...keys: string[]): Promise<number>;
  exists(key: string): Promise<number>;
  expire(key: string, seconds: number): Promise<number>;
  ping(): Promise<string>;
  disconnect(): void;
  on(event: string, listener: (...args: unknown[]) => void): void;
};

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client: RedisClient | null = null;
  private enabled = false;

  async onModuleInit() {
    try {
      const Redis = require('ioredis') as new (options: {
        host: string;
        port: number;
        password?: string;
        lazyConnect?: boolean;
        maxRetriesPerRequest?: number;
        retryStrategy?: (times: number) => number | null;
      }) => RedisClient;

      this.client = new Redis({
        host: process.env.REDIS_HOST ?? 'localhost',
        port: Number(process.env.REDIS_PORT ?? 6379),
        password: process.env.REDIS_PASSWORD || undefined,
        lazyConnect: true,
        maxRetriesPerRequest: undefined,
        retryStrategy: (times) => {
          if (times > 3) {
            this.logger.warn('Redis connection failed after 3 retries');
            return null;
          }
          return Math.min(times * 100, 3000);
        },
      });

      // Handle error events to prevent unhandled error crashes
      this.client.on('error', (error) => {
        if (this.enabled) {
          this.logger.warn(`Redis error: ${this.describeError(error)}`);
        }
      });

      this.client.on('close', () => {
        if (this.enabled) {
          this.logger.warn('Redis connection closed');
        }
      });

      await this.client.ping();
      this.enabled = true;
      this.logger.log('Redis connected');
    } catch (error) {
      this.enabled = false;
      this.client = null;
      this.logger.warn(
        `Redis unavailable, continuing without cache: ${this.describeError(error)}`,
      );
    }
  }

  async onModuleDestroy() {
    if (this.client) {
      this.client.disconnect();
    }
  }

  isEnabled() {
    return this.enabled && this.client !== null;
  }

  async get(key: string) {
    return this.client?.get(key) ?? null;
  }

  async set(key: string, value: string, ttlSeconds?: number) {
    if (!this.client) return false;
    if (ttlSeconds) {
      await this.client.set(key, value, 'EX', ttlSeconds);
    } else {
      await this.client.set(key, value);
    }
    return true;
  }

  async del(...keys: string[]) {
    return this.client?.del(...keys) ?? 0;
  }

  async exists(key: string) {
    return this.client?.exists(key) ?? 0;
  }

  async expire(key: string, seconds: number) {
    return this.client?.expire(key, seconds) ?? 0;
  }

  async setJSON(key: string, value: unknown, ttlSeconds?: number) {
    return this.set(key, JSON.stringify(value), ttlSeconds);
  }

  async getJSON<T = unknown>(key: string): Promise<T | null> {
    const raw = await this.get(key);
    if (raw === null) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  private describeError(error: unknown) {
    if (error instanceof Error) return error.message;
    return 'unknown error';
  }
}
