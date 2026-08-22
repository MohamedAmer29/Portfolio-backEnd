import { Controller, Get } from '@nestjs/common';
import { ExperienceService } from './experience.service';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly service: ExperienceService) {}
  @Get()
  findAll() {
    return this.service.findAll();
  }
}
