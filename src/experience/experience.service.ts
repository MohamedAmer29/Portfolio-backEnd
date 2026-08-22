import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Experience } from './entities/experience.entity';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(Experience) private readonly repo: Repository<Experience>,
  ) {}
  findAll() {
    return this.repo.find({
      order: { isCurrent: 'DESC', displayOrder: 'ASC', startDate: 'DESC' },
    });
  }
}
