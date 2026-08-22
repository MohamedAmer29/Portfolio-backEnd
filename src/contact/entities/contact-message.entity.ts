import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityColumns } from '../../shared/base.entity';
import {
  ContactStatus,
  EmailDeliveryStatus,
} from '../../shared/portfolio.enums';

@Entity('contact_messages')
export class ContactMessage extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ length: 120 })
  name!: string;
  @Column({ length: 180 })
  email!: string;
  @Column({ length: 180, nullable: true })
  subject?: string;
  @Column('text')
  message!: string;
  @Index()
  @Column({ type: 'enum', enum: ContactStatus, default: ContactStatus.NEW })
  status!: ContactStatus;

  @Index()
  @Column({
    type: 'enum',
    enum: EmailDeliveryStatus,
    default: EmailDeliveryStatus.PENDING,
  })
  emailStatus!: EmailDeliveryStatus;
}
