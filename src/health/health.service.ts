import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class HealthService {
  constructor(private readonly redisService: RedisService) {}

  async getHealth() {
    const redisUp = this.redisService.isEnabled();
    return {
      success: true,
      status: 'ok',
      services: {
        application: 'up',
        database: 'unknown',
        redis: redisUp ? 'up' : 'down',
      },
      timestamp: new Date().toISOString(),
    };
  }
}
