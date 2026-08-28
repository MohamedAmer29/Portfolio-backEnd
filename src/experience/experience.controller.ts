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
import { ExperienceService } from './experience.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

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

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an experience by id' })
  @ApiResponse({ status: 200, description: 'Returns the updated experience' })
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() body: UpdateExperienceDto) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an experience by id' })
  @ApiResponse({ status: 200, description: 'Experience deleted' })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
