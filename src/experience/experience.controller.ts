import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ExperienceService } from './experience.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateExperienceDto } from './dto/create-experience.dto';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly service: ExperienceService) {}
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: CreateExperienceDto) {
    return this.service.create(body);
  }
}
