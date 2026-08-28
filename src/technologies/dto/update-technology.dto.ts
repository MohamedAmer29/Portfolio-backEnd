import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateTechnologyDto {
  @ApiProperty({ example: 'TypeScript', required: false, description: 'Name of the technology' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string;

  @ApiProperty({ example: 'Language', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  category?: string;

  @ApiProperty({ example: 'typescript-icon', required: false })
  @IsOptional()
  @IsString()
  icon?: string;
}
