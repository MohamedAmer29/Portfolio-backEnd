import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      success: true,
      service: 'portfolio-backend',
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
