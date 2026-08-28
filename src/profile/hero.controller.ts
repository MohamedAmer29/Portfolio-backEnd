import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';

@Controller('hero')
export class HeroController {
  constructor(private readonly service: ProfileService) {}

  @Get()
  @ApiOperation({
    summary: 'Get the hero section (full name, bio, description)',
  })
  @ApiResponse({ status: 200, description: 'Returns the hero section' })
  async findOne() {
    const profile = await this.service.findOne();
    if (!profile) return null;
    return {
      fullName: profile.fullName,
      bio: profile.bio,
      description: profile.description ?? null,
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: CreateProfileDto) {
    return this.service.create(body);
  }

  @Patch()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update the hero section (full name, bio, description)',
  })
  @ApiResponse({ status: 200, description: 'Returns the updated profile' })
  @UseGuards(JwtAuthGuard)
  update(@Body() body: UpdateHeroDto) {
    return this.service.updateHero(body);
  }

  @Delete()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete the hero section',
  })
  @ApiResponse({ status: 200, description: 'Hero section deleted' })
  @UseGuards(JwtAuthGuard)
  remove() {
    return this.service.removeHero();
  }
}
