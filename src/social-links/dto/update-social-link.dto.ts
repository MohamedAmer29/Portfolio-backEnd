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

export class UpdateSocialLinkDto {
  @ApiProperty({ example: 'GitHub', required: false, description: 'Social platform name' })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  platform?: string;

  @ApiProperty({ example: 'https://github.com/me', required: false })
  @IsOptional()
  @IsUrl()
  @MaxLength(255)
  url?: string;

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
