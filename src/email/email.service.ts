import { Injectable, Logger } from '@nestjs/common';
import { EmailDeliveryStatus } from '../shared/portfolio.enums';
import { contactNotificationTemplate } from './templates/contact-notification.template';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  async sendContactNotification(payload: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) {
    try {
      const nodemailer = require('nodemailer') as typeof import('nodemailer');
      const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT ?? 587),
        secure: String(process.env.MAIL_SECURE ?? 'false') === 'true',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: process.env.CONTACT_RECEIVER_EMAIL,
        replyTo: payload.email,
        subject: `Portfolio Contact: ${payload.subject}`,
        html: contactNotificationTemplate({
          ...payload,
          receivedAt: new Date(),
        }),
      });

      return EmailDeliveryStatus.SENT;
    } catch (error) {
      this.logger.warn(
        `Email send failed for contact notification: ${this.describeError(error)}`,
      );
      return EmailDeliveryStatus.FAILED;
    }
  }

  async sendContactConfirmation(payload: { name: string; email: string }) {
    try {
      const nodemailer = require('nodemailer') as typeof import('nodemailer');
      const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT ?? 587),
        secure: String(process.env.MAIL_SECURE ?? 'false') === 'true',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: payload.email,
        subject: 'Thanks for reaching out',
        text: `Thanks ${payload.name}, I received your message and will reply soon.`,
      });

      return EmailDeliveryStatus.SENT;
    } catch (error) {
      this.logger.warn(
        `Email send failed for contact confirmation: ${this.describeError(error)}`,
      );
      return EmailDeliveryStatus.FAILED;
    }
  }

  async sendPasswordResetEmail(_payload: { email: string; resetUrl: string }) {
    return EmailDeliveryStatus.PENDING;
  }

  async sendVerificationEmail(_payload: { email: string; verifyUrl: string }) {
    return EmailDeliveryStatus.PENDING;
  }

  private describeError(error: unknown) {
    if (error instanceof Error) return error.message;
    return 'unknown error';
  }
}
