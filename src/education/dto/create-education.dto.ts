import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateEducationDto {
  @ApiProperty({ example: 'University of Example' })
  @IsString()
  @MaxLength(180)
  institution!: string;

  @ApiProperty({ example: 'B.Sc. Computer Science' })
  @IsString()
  @MaxLength(180)
  degree!: string;

  @ApiProperty({ example: 'Software Engineering', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(180)
  fieldOfStudy?: string;

  @ApiProperty({
    example: 'Studied algorithms and systems...',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'Boston, MA', required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ example: '2018-09-01', required: false })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ example: '2022-06-01', required: false })
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
