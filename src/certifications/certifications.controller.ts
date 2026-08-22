import { Controller, Get } from '@nestjs/common';
import { CertificationsService } from './certifications.service';

@Controller('certifications')
export class CertificationsController {
  constructor(private readonly service: CertificationsService) {}
  @Get()
  findAll() {
    return this.service.findAll();
  }
}
