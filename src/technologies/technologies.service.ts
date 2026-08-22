import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Technology } from './entities/technology.entity';
import { CreateTechnologyDto } from './dto/create-technology.dto';

@Injectable()
export class TechnologiesService {
  constructor(
    @InjectRepository(Technology) private readonly repo: Repository<Technology>,
  ) {}
  findAll() {
    return this.repo.find({ order: { createdAt: 'ASC' } });
  }

  create(data: CreateTechnologyDto) {
    return this.repo.save(this.repo.create(data));
  }
}
