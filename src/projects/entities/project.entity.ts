import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from '../../shared/base.entity';
import { ProjectStatus } from '../../shared/portfolio.enums';
import { Technology } from '../../technologies/entities/technology.entity';

@Entity('projects')
export class Project extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ length: 180 })
  title!: string;
  @Index({ unique: true })
  @Column({ length: 220 })
  slug!: string;
  @Column('text')
  shortDescription!: string;
  @Column('text')
  description!: string;
  @Column({ nullable: true })
  image?: string;
  @Column({ nullable: true })
  githubUrl?: string;
  @Column({ nullable: true })
  liveUrl?: string;
  @Index()
  @Column({ default: false })
  featured!: boolean;
  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.PLANNING,
  })
  status!: ProjectStatus;
  @Index()
  @Column({ type: 'int', default: 0 })
  displayOrder!: number;
  @Column({ type: 'date', nullable: true })
  startDate?: string;
  @Column({ type: 'date', nullable: true })
  endDate?: string;
  @ManyToMany(() => Technology, { cascade: false, eager: true })
  @JoinTable({ name: 'project_technologies' })
  technologies!: Technology[];
}
