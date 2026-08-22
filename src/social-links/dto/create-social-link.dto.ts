import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateSocialLinkDto {
  @ApiProperty({ example: 'GitHub', description: 'Social platform name' })
  @IsString()
  @MaxLength(80)
  platform!: string;

  @ApiProperty({ example: 'https://github.com/me' })
  @IsUrl()
  @MaxLength(255)
  url!: string;

  @ApiProperty({ example: '@me', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  username?: string;

  @ApiProperty({ example: 'github-icon', required: false })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  displayOrder?: number;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;
}
