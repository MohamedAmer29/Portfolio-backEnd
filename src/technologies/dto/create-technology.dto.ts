import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTechnologyDto {
  @ApiProperty({ example: 'TypeScript', description: 'Name of the technology' })
  @IsString()
  @MaxLength(120)
  name!: string;

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
