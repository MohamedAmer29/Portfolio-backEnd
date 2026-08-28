import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityColumns } from '../../shared/base.entity';

@Entity('education')
export class Education extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ length: 180 })
  institution!: string;
  @Column({ length: 180 })
  degree!: string;
  @Column({ length: 180, nullable: true })
  fieldOfStudy?: string;
  @Column('text', { nullable: true })
  description?: string;
  @Column('text', { array: true, nullable: true })
  coursework?: string[];
  @Column('text', { array: true, nullable: true })
  achievements?: string[];
  @Column('text', { array: true, nullable: true })
  academicFocus?: string[];
  @Column({ nullable: true })
  location?: string;
  @Column({ type: 'varchar', length: 20, nullable: true })
  startDate?: string;
  @Column({ type: 'varchar', length: 20, nullable: true })
  endDate?: string;
  @Column({ default: false })
  isCurrent!: boolean;
  @Column({ type: 'int', default: 0 })
  displayOrder!: number;
}
