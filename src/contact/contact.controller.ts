import { Body, Controller, Post } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly service: ContactService) {}
  @Post()
  create(@Body() body: unknown) {
    return this.service.create(body as never);
  }
}
