import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @MaxLength(150)
  fullName!: string;

  @ApiProperty({ example: 'Full-Stack Developer' })
  @IsString()
  @MaxLength(200)
  headline!: string;

  @ApiProperty({ example: 'I am a developer with a passion for...' })
  @IsString()
  bio!: string;

  @ApiProperty({ example: 'Builder of things.' })
  @IsString()
  shortBio!: string;

  @ApiProperty({ example: 'https://cdn.example.com/me.png', required: false })
  @IsOptional()
  @IsString()
  profileImage?: string;

  @ApiProperty({ example: 'Berlin, Germany', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  location?: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  @MaxLength(180)
  email!: string;

  @ApiProperty({ example: '+49123456789', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  phone?: string;

  @ApiProperty({ example: 'https://example.com/resume.pdf', required: false })
  @IsOptional()
  @IsString()
  resumeUrl?: string;

  @ApiProperty({
    example: 'AVAILABLE',
    required: false,
    description: 'Availability status (e.g. AVAILABLE, OPEN_TO_WORK)',
  })
  @IsOptional()
  @IsString()
  availabilityStatus?: string;
}
