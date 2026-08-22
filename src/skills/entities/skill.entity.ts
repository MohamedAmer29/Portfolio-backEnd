import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityColumns } from '../../shared/base.entity';
import { SkillCategory } from '../../shared/portfolio.enums';

@Entity('skills')
export class Skill extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ length: 120 })
  name!: string;
  @Index()
  @Column({ type: 'enum', enum: SkillCategory })
  category!: SkillCategory;
  @Column({ type: 'smallint', default: 0 })
  proficiency!: number;
  @Column({ type: 'numeric', precision: 4, scale: 1, default: 0 })
  yearsOfExperience!: number;
  @Column({ nullable: true })
  icon?: string;
  @Column('text', { nullable: true })
  description?: string;
  @Index()
  @Column({ type: 'int', default: 0 })
  displayOrder!: number;
  @Column({ default: false })
  isFeatured!: boolean;
}
