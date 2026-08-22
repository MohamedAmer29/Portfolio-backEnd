import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateServiceOfferDto {
  @ApiProperty({ example: 'Backend Development' })
  @IsString()
  @MaxLength(180)
  title!: string;

  @ApiProperty({ example: 'I build scalable REST and GraphQL APIs...' })
  @IsString()
  description!: string;

  @ApiProperty({ example: 'server-icon', required: false })
  @IsOptional()
  @IsString()
  icon?: string;

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
