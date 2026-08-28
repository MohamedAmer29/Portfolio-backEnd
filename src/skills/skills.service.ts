import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill) private readonly repo: Repository<Skill>,
  ) {}
  async findAll() {
    const skills = await this.repo.find({
      order: { displayOrder: 'ASC', createdAt: 'ASC' },
    });
    const categoryOrder: string[] = [
      'Frontend',
      'Backend',
      'Database',
      'DevOps',
      'ai',
      'Tools',
      'Other',
    ];
    const categories = [
      ...new Set(skills.map((s) => s.category)),
    ].sort(
      (a, b) =>
        categoryOrder.indexOf(a) - categoryOrder.indexOf(b),
    );
    const skillsByCategory = categories.map((category) => {
      const items = skills.filter((s) => s.category === category);
      return { category, count: items.length, skills: items };
    });
    return { categories, total: skills.length, skillsByCategory };
  }

  create(data: CreateSkillDto) {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: string, data: UpdateSkillDto): Promise<Skill> {
    const skill = await this.repo.findOneBy({ id });
    if (!skill) {
      throw new NotFoundException('Skill not found');
    }
    if (data.name !== undefined) skill.name = data.name;
    if (data.category !== undefined) skill.category = data.category;
    if (data.proficiency !== undefined) skill.proficiency = data.proficiency;
    if (data.yearsOfExperience !== undefined)
      skill.yearsOfExperience = data.yearsOfExperience;
    if (data.icon !== undefined) skill.icon = data.icon;
    if (data.description !== undefined) skill.description = data.description;
    if (data.related !== undefined) skill.related = data.related;
    if (data.displayOrder !== undefined) skill.displayOrder = data.displayOrder;
    if (data.isFeatured !== undefined) skill.isFeatured = data.isFeatured;
    return this.repo.save(skill);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
