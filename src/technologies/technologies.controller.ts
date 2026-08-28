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
import { TechnologiesService } from './technologies.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';

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

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a technology by id' })
  @ApiResponse({ status: 200, description: 'Returns the updated technology' })
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() body: UpdateTechnologyDto) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a technology by id' })
  @ApiResponse({ status: 200, description: 'Technology deleted' })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
