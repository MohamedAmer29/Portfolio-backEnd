import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from '../../shared/base.entity';
import { Technology } from '../../technologies/entities/technology.entity';

@Entity('about_me')
export class AboutMe extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text', { array: true, nullable: true })
  sentences?: string[];

  @Column({ type: 'varchar', length: 500, nullable: true })
  image?: string;

  @ManyToMany(() => Technology, { eager: true })
  @JoinTable({
    name: 'about_me_technologies',
    joinColumn: { name: 'about_me_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'technology_id', referencedColumnName: 'id' },
  })
  technologies!: Technology[];
}
