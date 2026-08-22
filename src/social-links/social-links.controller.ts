import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SocialLinksService } from './social-links.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateSocialLinkDto } from './dto/create-social-link.dto';

@Controller('social-links')
export class SocialLinksController {
  constructor(private readonly service: SocialLinksService) {}
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: CreateSocialLinkDto) {
    return this.service.create(body);
  }
}
