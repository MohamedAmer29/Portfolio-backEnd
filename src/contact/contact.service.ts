import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactMessage } from './entities/contact-message.entity';
import { EmailService } from '../email/email.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { UpdateContactMessageDto } from './dto/update-contact-message.dto';
import { EmailDeliveryStatus, ContactStatus } from '../shared/portfolio.enums';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactMessage)
    private readonly repo: Repository<ContactMessage>,
    private readonly emailService: EmailService,
  ) {}

  async create(data: CreateContactMessageDto) {
    const saved = await this.repo.save(
      this.repo.create({
        ...data,
        status: ContactStatus.NEW,
        emailStatus: EmailDeliveryStatus.PENDING,
      }),
    );

    const notificationStatus = await this.emailService.sendContactNotification({
      name: saved.name,
      email: saved.email,
      subject: saved.subject ?? '',
      message: saved.message ?? '',
    });
    const confirmationStatus = await this.emailService.sendContactConfirmation({
      name: saved.name,
      email: saved.email,
    });

    saved.emailStatus =
      notificationStatus === EmailDeliveryStatus.SENT &&
      confirmationStatus === EmailDeliveryStatus.SENT
        ? EmailDeliveryStatus.SENT
        : EmailDeliveryStatus.FAILED;

    return this.repo.save(saved);
  }

  async findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async update(
    id: string,
    data: UpdateContactMessageDto,
  ): Promise<ContactMessage> {
    const message = await this.repo.findOneBy({ id });
    if (!message) {
      throw new NotFoundException('Contact message not found');
    }
    if (data.name !== undefined) message.name = data.name;
    if (data.email !== undefined) message.email = data.email;
    if (data.subject !== undefined) message.subject = data.subject;
    if (data.message !== undefined) message.message = data.message;
    return this.repo.save(message);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
