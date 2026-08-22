import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityColumns } from '../../shared/base.entity';

@Entity('certifications')
export class Certification extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ length: 180 })
  name!: string;
  @Column({ length: 180 })
  issuer!: string;
  @Column('text', { nullable: true })
  description?: string;
  @Column({ type: 'date', nullable: true })
  issueDate?: string;
  @Column({ type: 'date', nullable: true })
  expirationDate?: string;
  @Column({ nullable: true })
  credentialId?: string;
  @Column({ nullable: true })
  credentialUrl?: string;
  @Column({ nullable: true })
  image?: string;
  @Column({ type: 'int', default: 0 })
  displayOrder!: number;
}
