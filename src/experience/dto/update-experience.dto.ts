import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { EmploymentType } from '../../shared/portfolio.enums';

export class UpdateExperienceDto {
  @ApiProperty({ example: 'Acme Corp', required: false, description: 'Company name' })
  @IsOptional()
  @IsString()
  @MaxLength(180)
  company?: string;

  @ApiProperty({ example: 'Senior Backend Engineer', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(180)
  position?: string;

  @ApiProperty({
    type: [String],
    example: ['Led the migration to a microservices architecture.'],
    required: false,
    description: 'List of responsibilities and achievements',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  description?: string[];

  @ApiProperty({ example: 'Remote', required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({
    enum: EmploymentType,
    example: EmploymentType.FULL_TIME,
    required: false,
  })
  @IsOptional()
  @IsEnum(EmploymentType)
  employmentType?: EmploymentType;

  @ApiProperty({ example: '2022-03-01', required: false, description: 'Start date (ISO 8601)' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ example: '2024-03-01', required: false })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isCurrent?: boolean;

  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  displayOrder?: number;
}
