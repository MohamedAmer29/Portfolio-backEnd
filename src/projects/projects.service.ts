import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';

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

  create(data: CreateProjectDto) {
    return this.repo.save(
      this.repo.create(data as unknown as Record<string, unknown>),
    );
  }
}
