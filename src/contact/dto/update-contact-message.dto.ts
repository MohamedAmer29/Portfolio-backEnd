import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateContactMessageDto {
  @ApiProperty({
    example: 'Jane Doe',
    required: false,
    description: 'Name of the person sending the message',
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  name?: string;

  @ApiProperty({
    example: 'jane@example.com',
    required: false,
    description: 'Email address of the sender',
  })
  @IsOptional()
  @IsEmail()
  @MaxLength(180)
  email?: string;

  @ApiProperty({
    example: 'Project collaboration',
    required: false,
    description: 'Subject of the message',
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(180)
  subject?: string;

  @ApiProperty({
    example: 'Hi, I would like to discuss a potential project...',
    required: false,
    description: 'Body of the message',
  })
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(5000)
  message?: string;
}
