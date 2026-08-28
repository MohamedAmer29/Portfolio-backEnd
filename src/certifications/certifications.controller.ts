import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CertificationsService } from './certifications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';

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

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a certification by id' })
  @ApiResponse({ status: 200, description: 'Returns the updated certification' })
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() body: UpdateCertificationDto) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a certification by id' })
  @ApiResponse({ status: 200, description: 'Certification deleted' })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
