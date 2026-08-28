import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ServiceGroupDto } from './create-service-offer.dto';

export class UpdateServiceOfferDto {
  @ApiProperty({ example: 'Backend Development', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(180)
  title?: string;

  @ApiProperty({ example: 'I build scalable REST and GraphQL APIs...', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'server-icon', required: false })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty({ example: '01', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(8)
  number?: string;

  @ApiProperty({ example: 'Full Stack', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  category?: string;

  @ApiProperty({ example: '#456e6e', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(16)
  color?: string;

  @ApiProperty({
    example: 'detail',
    required: false,
    enum: ['compact', 'standard', 'detail'],
  })
  @IsOptional()
  @IsIn(['compact', 'standard', 'detail'])
  emphasis?: string;

  @ApiProperty({ type: [String], example: ['React', 'NestJS'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  technologies?: string[];

  @ApiProperty({ type: ServiceGroupDto, isArray: true, required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceGroupDto)
  groups?: ServiceGroupDto[];

  @ApiProperty({
    type: [String],
    example: ['Clean architecture that scales.'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  highlights?: string[];

  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  displayOrder?: number;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}
