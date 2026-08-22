import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntityColumns {
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
