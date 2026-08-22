import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CertificationsService } from './certifications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCertificationDto } from './dto/create-certification.dto';

@Controller('certifications')
export class CertificationsController {
  constructor(private readonly service: CertificationsService) {}
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: CreateCertificationDto) {
    return this.service.create(body);
  }
}
