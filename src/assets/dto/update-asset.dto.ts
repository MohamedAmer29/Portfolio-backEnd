import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateAssetDto {
  @ApiProperty({ example: 'Hero banner', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(180)
  name?: string;

  @ApiProperty({ example: 'https://cdn.example.com/hero.png', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  url?: string;

  @ApiProperty({
    example: 'image',
    required: false,
    description: 'Asset type (image, doc, etc.)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  type?: string;

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
