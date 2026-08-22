import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill) private readonly repo: Repository<Skill>,
  ) {}
  findAll() {
    return this.repo.find({ order: { displayOrder: 'ASC', createdAt: 'ASC' } });
  }
}
