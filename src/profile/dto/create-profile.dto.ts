import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({ example: 'Jane Doe' })
  @IsString()
  @MaxLength(150)
  fullName!: string;

  @ApiProperty({ example: 'I build things.' })
  @IsString()
  bio!: string;

  @ApiProperty({ example: 'A longer description.' })
  @IsString()
  description!: string;
}
