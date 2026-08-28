import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Education } from './entities/education.entity';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

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

  async update(id: string, data: UpdateEducationDto): Promise<Education> {
    const education = await this.repo.findOneBy({ id });
    if (!education) {
      throw new NotFoundException('Education not found');
    }
    if (data.institution !== undefined) education.institution = data.institution;
    if (data.degree !== undefined) education.degree = data.degree;
    if (data.fieldOfStudy !== undefined)
      education.fieldOfStudy = data.fieldOfStudy;
    if (data.description !== undefined) education.description = data.description;
    if (data.coursework !== undefined) education.coursework = data.coursework;
    if (data.achievements !== undefined) education.achievements = data.achievements;
    if (data.academicFocus !== undefined) education.academicFocus = data.academicFocus;
    if (data.location !== undefined) education.location = data.location;
    if (data.startDate !== undefined) education.startDate = data.startDate;
    if (data.endDate !== undefined) education.endDate = data.endDate;
    if (data.isCurrent !== undefined) education.isCurrent = data.isCurrent;
    if (data.displayOrder !== undefined)
      education.displayOrder = data.displayOrder;
    return this.repo.save(education);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
