import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateContactMessageDto {
  @ApiProperty({
    example: 'Jane Doe',
    description: 'Name of the person sending the message',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  name!: string;

  @ApiProperty({
    example: 'jane@example.com',
    description: 'Email address of the sender',
  })
  @IsEmail()
  @MaxLength(180)
  email!: string;

  @ApiProperty({
    example: 'Project collaboration',
    description: 'Subject of the message',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(180)
  subject!: string;

  @ApiProperty({
    example: 'Hi, I would like to discuss a potential project...',
    description: 'Body of the message',
  })
  @IsString()
  @MinLength(10)
  @MaxLength(5000)
  message!: string;
}
