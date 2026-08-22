import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TechnologiesService } from './technologies.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTechnologyDto } from './dto/create-technology.dto';

@Controller('technologies')
export class TechnologiesController {
  constructor(private readonly service: TechnologiesService) {}
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: CreateTechnologyDto) {
    return this.service.create(body);
  }
}
