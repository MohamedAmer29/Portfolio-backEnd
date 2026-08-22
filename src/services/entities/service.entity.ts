import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityColumns } from '../../shared/base.entity';

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
  @Column({ type: 'int', default: 0 })
  displayOrder!: number;
  @Column({ default: false })
  isFeatured!: boolean;
}
