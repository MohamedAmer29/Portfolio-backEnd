import { Controller, Get } from '@nestjs/common';
import { TechnologiesService } from './technologies.service';

@Controller('technologies')
export class TechnologiesController {
  constructor(private readonly service: TechnologiesService) {}
  @Get()
  findAll() {
    return this.service.findAll();
  }
}
