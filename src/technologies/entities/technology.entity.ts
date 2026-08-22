import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityColumns } from '../../shared/base.entity';

@Entity('technologies')
export class Technology extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ length: 120, unique: true })
  name!: string;
  @Column({ length: 120, nullable: true })
  category?: string;
  @Column({ nullable: true })
  icon?: string;
}
