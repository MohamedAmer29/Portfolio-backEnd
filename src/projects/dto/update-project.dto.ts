import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
} from 'class-validator';
import { ProjectStatus } from '../../shared/portfolio.enums';

export class UpdateProjectDto {
  @ApiProperty({ example: 'Portfolio API', required: false, description: 'Project title' })
  @IsOptional()
  @IsString()
  @MaxLength(180)
  title?: string;

  @ApiProperty({
    example: 'portfolio-api',
    required: false,
    description: 'URL-friendly unique slug',
  })
  @IsOptional()
  @IsString()
  @MaxLength(220)
  slug?: string;

  @ApiProperty({ example: 'A short summary of the project', required: false })
  @IsOptional()
  @IsString()
  shortDescription?: string;

  @ApiProperty({ example: 'Full project description...', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'https://cdn.example.com/project.png',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  image?: string;

  @ApiProperty({ example: 'https://github.com/me/project', required: false })
  @IsOptional()
  @IsUrl()
  githubUrl?: string;

  @ApiProperty({ example: 'https://project.example.com', required: false })
  @IsOptional()
  @IsUrl()
  liveUrl?: string;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiProperty({
    enum: ProjectStatus,
    example: ProjectStatus.PLANNING,
    required: false,
  })
  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  displayOrder?: number;

  @ApiProperty({ example: '2024-01-01', required: false })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ example: '2024-06-01', required: false })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({
    type: [String],
    example: ['technology-id-1', 'technology-id-2'],
    required: false,
    description: 'IDs of the related technologies',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  technologies?: string[];
}
