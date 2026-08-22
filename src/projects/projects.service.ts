import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private readonly repo: Repository<Project>,
  ) {}
  findAll() {
    return this.repo.find({
      order: { featured: 'DESC', displayOrder: 'ASC', createdAt: 'DESC' },
    });
  }
}
