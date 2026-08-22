import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactMessage } from './entities/contact-message.entity';
import { EmailService } from '../email/email.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
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
}
