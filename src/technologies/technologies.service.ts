import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Technology } from './entities/technology.entity';

@Injectable()
export class TechnologiesService {
  constructor(
    @InjectRepository(Technology) private readonly repo: Repository<Technology>,
  ) {}
  findAll() {
    return this.repo.find({ order: { createdAt: 'ASC' } });
  }
}
