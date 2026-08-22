import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAssetDto {
  @ApiProperty({ example: 'Hero banner' })
  @IsString()
  @MaxLength(180)
  name!: string;

  @ApiProperty({ example: 'https://cdn.example.com/hero.png' })
  @IsString()
  @MaxLength(255)
  url!: string;

  @ApiProperty({
    example: 'image',
    description: 'Asset type (image, doc, etc.)',
  })
  @IsString()
  @MaxLength(80)
  type!: string;

  @ApiProperty({ example: 'Decorative hero image', required: false })
  @IsOptional()
  @IsString()
  altText?: string;

  @ApiProperty({
    example: 'Uploaded for the homepage hero section',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
