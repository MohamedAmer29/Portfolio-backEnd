import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityColumns } from '../../shared/base.entity';

@Entity('assets')
export class Asset extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ length: 180 })
  name!: string;
  @Column({ length: 255 })
  url!: string;
  @Column({ length: 80 })
  type!: string;
  @Column({ nullable: true })
  altText?: string;
  @Column('text', { nullable: true })
  description?: string;
}
