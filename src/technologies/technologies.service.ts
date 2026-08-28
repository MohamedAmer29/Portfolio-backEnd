import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Technology } from './entities/technology.entity';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';

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

  async update(id: string, data: UpdateTechnologyDto): Promise<Technology> {
    const technology = await this.repo.findOneBy({ id });
    if (!technology) {
      throw new NotFoundException('Technology not found');
    }
    if (data.name !== undefined) technology.name = data.name;
    if (data.category !== undefined) technology.category = data.category;
    if (data.icon !== undefined) technology.icon = data.icon;
    return this.repo.save(technology);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
