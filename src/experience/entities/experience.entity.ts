import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityColumns } from '../../shared/base.entity';
import { EmploymentType } from '../../shared/portfolio.enums';

@Entity('experiences')
export class Experience extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ length: 180 })
  company!: string;
  @Column({ length: 180 })
  position!: string;
  @Column('text')
  description!: string;
  @Column({ nullable: true })
  location?: string;
  @Column({
    type: 'enum',
    enum: EmploymentType,
    default: EmploymentType.FULL_TIME,
  })
  employmentType!: EmploymentType;
  @Index()
  @Column({ type: 'date' })
  startDate!: string;
  @Column({ type: 'date', nullable: true })
  endDate?: string;
  @Index()
  @Column({ default: false })
  isCurrent!: boolean;
  @Index()
  @Column({ type: 'int', default: 0 })
  displayOrder!: number;
}
