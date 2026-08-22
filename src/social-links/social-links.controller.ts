import { Controller, Get } from '@nestjs/common';
import { SocialLinksService } from './social-links.service';

@Controller('social-links')
export class SocialLinksController {
  constructor(private readonly service: SocialLinksService) {}
  @Get()
  findAll() {
    return this.service.findAll();
  }
}
