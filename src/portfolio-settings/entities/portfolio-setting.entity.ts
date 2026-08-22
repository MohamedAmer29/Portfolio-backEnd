import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityColumns } from '../../shared/base.entity';

@Entity('portfolio_settings')
export class PortfolioSetting extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ unique: true, length: 120 })
  key!: string;
  @Column('text')
  value!: string;
}
