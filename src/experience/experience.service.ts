import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Experience } from './entities/experience.entity';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

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

  create(data: CreateExperienceDto) {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: string, data: UpdateExperienceDto): Promise<Experience> {
    const experience = await this.repo.findOneBy({ id });
    if (!experience) {
      throw new NotFoundException('Experience not found');
    }
    if (data.company !== undefined) experience.company = data.company;
    if (data.position !== undefined) experience.position = data.position;
    if (data.description !== undefined) experience.description = data.description;
    if (data.location !== undefined) experience.location = data.location;
    if (data.employmentType !== undefined)
      experience.employmentType = data.employmentType;
    if (data.startDate !== undefined) experience.startDate = data.startDate;
    if (data.endDate !== undefined) experience.endDate = data.endDate;
    if (data.isCurrent !== undefined) experience.isCurrent = data.isCurrent;
    if (data.displayOrder !== undefined)
      experience.displayOrder = data.displayOrder;
    return this.repo.save(experience);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
