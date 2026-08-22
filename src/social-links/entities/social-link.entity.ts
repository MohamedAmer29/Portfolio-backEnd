import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityColumns } from '../../shared/base.entity';

@Entity('social_links')
export class SocialLink extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ length: 80 })
  platform!: string;
  @Column({ length: 255 })
  url!: string;
  @Column({ length: 120, nullable: true })
  username?: string;
  @Column({ nullable: true })
  icon?: string;
  @Column({ type: 'int', default: 0 })
  displayOrder!: number;
  @Column({ default: true })
  isVisible!: boolean;
}
