import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';

@ApiTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly service: ContactService) {}
  @ApiOperation({ summary: 'Submit a contact message' })
  @ApiResponse({ status: 201, description: 'Message created' })
  @Post()
  create(@Body() body: CreateContactMessageDto) {
    return this.service.create(body);
  }

  @ApiOperation({ summary: 'List all contact messages' })
  @ApiResponse({ status: 200, description: 'Array of contact messages' })
  @Get()
  @HttpCode(200)
  findAll() {
    return this.service.findAll();
  }
}
