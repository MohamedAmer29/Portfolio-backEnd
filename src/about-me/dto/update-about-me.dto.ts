import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateAboutMeDto {
  @ApiProperty({
    type: [String],
    required: false,
    example: [
      'I build full-stack applications with a focus on developer experience.',
      'Lately I have been exploring edge runtimes and real-time systems.',
    ],
    description: 'Description sentences shown in the About Me section',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sentences?: string[];

  @ApiProperty({
    type: [String],
    required: false,
    example: ['uuid-1', 'uuid-2'],
    description: 'IDs of technologies you have been working with recently',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  technologyIds?: string[];

  @ApiProperty({
    required: false,
    example: 'https://res.cloudinary.com/.../about-me.png',
    description: 'Image URL (e.g. uploaded via Cloudinary)',
  })
  @IsOptional()
  @IsString()
  image?: string;
}
