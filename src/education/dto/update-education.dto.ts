import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateEducationDto {
  @ApiProperty({ example: 'University of Example', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(180)
  institution?: string;

  @ApiProperty({ example: 'B.Sc. Computer Science', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(180)
  degree?: string;

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

  @ApiProperty({ example: ['Software Engineering'], required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  coursework?: string[];

  @ApiProperty({ example: ['Dean\'s List'], required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  achievements?: string[];

  @ApiProperty({ example: ['Algorithms'], required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  academicFocus?: string[];

  @ApiProperty({ example: 'Boston, MA', required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ example: '2018', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  startDate?: string;

  @ApiProperty({ example: '2022', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(20)
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
