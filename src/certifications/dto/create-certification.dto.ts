import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateCertificationDto {
  @ApiProperty({ example: 'AWS Certified Solutions Architect' })
  @IsString()
  @MaxLength(180)
  name!: string;

  @ApiProperty({ example: 'Amazon Web Services' })
  @IsString()
  @MaxLength(180)
  issuer!: string;

  @ApiProperty({
    example: 'Validates cloud architecture skills',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '2023-05-01', required: false })
  @IsOptional()
  @IsDateString()
  issueDate?: string;

  @ApiProperty({ example: '2026-05-01', required: false })
  @IsOptional()
  @IsDateString()
  expirationDate?: string;

  @ApiProperty({ example: 'AWS-ASA-12345', required: false })
  @IsOptional()
  @IsString()
  credentialId?: string;

  @ApiProperty({
    example: 'https://www.credly.com/badges/123',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  credentialUrl?: string;

  @ApiProperty({ example: 'https://cdn.example.com/cert.png', required: false })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  displayOrder?: number;
}
