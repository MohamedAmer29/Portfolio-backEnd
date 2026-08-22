import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Education } from './entities/education.entity';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education) private readonly repo: Repository<Education>,
  ) {}
  findAll() {
    return this.repo.find({
      order: { isCurrent: 'DESC', displayOrder: 'ASC' },
    });
  }
}
