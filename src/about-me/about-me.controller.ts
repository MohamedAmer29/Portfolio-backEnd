import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AboutMeService } from './about-me.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import type { ImageFile } from '../cloudinary/cloudinary.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateAboutMeDto } from './dto/create-about-me.dto';
import { UpdateAboutMeDto } from './dto/update-about-me.dto';

@Controller('about-me')
export class AboutMeController {
  constructor(
    private readonly service: AboutMeService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get the About Me section (description sentences + recent technologies)',
  })
  @ApiResponse({ status: 200, description: 'Returns the About Me entry' })
  get() {
    return (
      this.service.getAboutMe() ?? {
        sentences: [],
        technologies: [],
      }
    );
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create or update the About Me section',
  })
  @ApiResponse({ status: 200, description: 'Returns the saved About Me entry' })
  @UseGuards(JwtAuthGuard)
  create(@Body() body: CreateAboutMeDto) {
    return this.service.createOrUpdate(body);
  }

  @Post('image')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Upload the About Me image to Cloudinary and store its URL',
  })
  @ApiResponse({ status: 200, description: 'Returns the updated About Me entry' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description: 'Image file to upload (max ~10MB)',
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: ImageFile) {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }
    const { url } = await this.cloudinary.uploadImage(file);
    return this.service.setImage(url);
  }

  @Patch('image')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update (replace) the About Me image via Cloudinary upload',
  })
  @ApiResponse({ status: 200, description: 'Returns the updated About Me entry' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description: 'New image file to upload (max ~10MB)',
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async updateImage(@UploadedFile() file: ImageFile) {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }
    const { url } = await this.cloudinary.uploadImage(file);
    return this.service.setImage(url);
  }

  @Patch()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update the About Me section',
  })
  @ApiResponse({ status: 200, description: 'Returns the updated About Me entry' })
  @UseGuards(JwtAuthGuard)
  update(@Body() body: UpdateAboutMeDto) {
    return this.service.updateAboutMe(body);
  }

  @Delete()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete the About Me section',
  })
  @ApiResponse({ status: 200, description: 'About Me entry deleted' })
  @UseGuards(JwtAuthGuard)
  remove() {
    return this.service.removeAboutMe();
  }
}
