import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { SkillCategory } from '../../shared/portfolio.enums';

export class CreateSkillDto {
  @ApiProperty({ example: 'NestJS', description: 'Name of the skill' })
  @IsString()
  @MaxLength(120)
  name!: string;

  @ApiProperty({
    enum: SkillCategory,
    example: SkillCategory.BACKEND,
    description: 'Category the skill belongs to',
  })
  @IsEnum(SkillCategory)
  category!: SkillCategory;

  @ApiProperty({
    example: 80,
    minimum: 0,
    maximum: 100,
    required: false,
    description: 'Proficiency level from 0 to 100',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  proficiency?: number;

  @ApiProperty({
    example: 3.5,
    required: false,
    description: 'Years of experience with this skill',
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0)
  yearsOfExperience?: number;

  @ApiProperty({ example: 'nestjs-icon', required: false })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty({
    example: 'Backend framework for Node.js',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  displayOrder?: number;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  isFeatured?: boolean;
}
