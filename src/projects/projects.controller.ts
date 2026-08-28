import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
import { ProjectsService } from './projects.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import type { ImageFile } from '../cloudinary/cloudinary.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly service: ProjectsService,
    private readonly cloudinary: CloudinaryService,
  ) {}
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: CreateProjectDto) {
    return this.service.create(body);
  }

  @Post(':id/image')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Upload a project image to Cloudinary and store its URL',
  })
  @ApiResponse({ status: 200, description: 'Returns the updated project' })
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
  uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: ImageFile,
  ) {
    return this.handleImageUpload(id, file);
  }

  @Patch(':id/image')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Replace the project image via Cloudinary upload',
  })
  @ApiResponse({ status: 200, description: 'Returns the updated project' })
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
  replaceImage(
    @Param('id') id: string,
    @UploadedFile() file: ImageFile,
  ) {
    return this.handleImageUpload(id, file);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a project by id' })
  @ApiResponse({ status: 200, description: 'Returns the updated project' })
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() body: UpdateProjectDto) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a project by id' })
  @ApiResponse({ status: 200, description: 'Project deleted' })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  private async handleImageUpload(id: string, file?: ImageFile) {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }
    const { url } = await this.cloudinary.uploadImage(
      file,
      'portfolio/projects',
    );
    return this.service.setImage(id, url);
  }
}
