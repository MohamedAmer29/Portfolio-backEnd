import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityColumns } from '../../shared/base.entity';

@Entity('profiles')
export class Profile extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ length: 150 })
  fullName!: string;
  @Column({ length: 200 })
  headline!: string;
  @Column('text')
  bio!: string;
  @Column('text')
  shortBio!: string;
  @Column({ nullable: true })
  profileImage?: string;
  @Column({ nullable: true, length: 120 })
  location?: string;
  @Column({ unique: true, length: 180 })
  email!: string;
  @Column({ nullable: true, length: 40 })
  phone?: string;
  @Column({ nullable: true })
  resumeUrl?: string;
  @Column({ default: 'AVAILABLE' })
  availabilityStatus!: string;
}
