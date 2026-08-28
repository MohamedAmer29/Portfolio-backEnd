import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateHeroDto {
  @ApiProperty({ required: false, example: 'Jane Doe' })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  fullName?: string;

  @ApiProperty({ required: false, example: 'I build things.' })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ required: false, example: 'A longer description.' })
  @IsOptional()
  @IsString()
  description?: string;
}
