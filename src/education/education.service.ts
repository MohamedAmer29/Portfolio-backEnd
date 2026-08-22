import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Education } from './entities/education.entity';
import { CreateEducationDto } from './dto/create-education.dto';

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

  create(data: CreateEducationDto) {
    return this.repo.save(this.repo.create(data));
  }
}
