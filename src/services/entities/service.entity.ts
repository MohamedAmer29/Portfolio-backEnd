import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityColumns } from '../../shared/base.entity';

export interface ServiceGroup {
  label: string;
  items: string[];
}

@Entity('services')
export class ServiceOffer extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ length: 180 })
  title!: string;
  @Column('text')
  description!: string;
  @Column({ nullable: true })
  icon?: string;
  @Column({ length: 8, nullable: true })
  number?: string;
  @Column({ length: 80, nullable: true })
  category?: string;
  @Column({ length: 16, nullable: true })
  color?: string;
  @Column({ length: 20, nullable: true })
  emphasis?: string;
  @Column('text', { array: true, nullable: true })
  technologies?: string[];
  @Column('jsonb', { nullable: true })
  groups?: ServiceGroup[];
  @Column('text', { array: true, nullable: true })
  highlights?: string[];
  @Column({ type: 'int', default: 0 })
  displayOrder!: number;
  @Column({ default: false })
  isFeatured!: boolean;
}
