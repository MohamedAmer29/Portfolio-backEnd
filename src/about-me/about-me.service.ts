import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { AboutMe } from './entities/about-me.entity';
import { Technology } from '../technologies/entities/technology.entity';
import { CreateAboutMeDto } from './dto/create-about-me.dto';
import { UpdateAboutMeDto } from './dto/update-about-me.dto';

@Injectable()
export class AboutMeService {
  constructor(
    @InjectRepository(AboutMe)
    private readonly repo: Repository<AboutMe>,
    @InjectRepository(Technology)
    private readonly technologies: Repository<Technology>,
  ) {}

  async getAboutMe(): Promise<AboutMe | null> {
    const [first] = await this.repo.find({
      take: 1,
      order: { createdAt: 'DESC' },
    });
    return first ?? null;
  }

  async createOrUpdate(data: CreateAboutMeDto): Promise<AboutMe> {
    const techs = data.technologyIds?.length
      ? await this.technologies.find({
          where: { id: In(data.technologyIds) },
        })
      : [];

    const [existing] = await this.repo.find({
      take: 1,
      order: { createdAt: 'DESC' },
    });

    let about = existing;
    if (!about) {
      about = this.repo.create({
        sentences: data.sentences,
        technologies: techs,
      });
    } else {
      about.sentences = data.sentences;
      about.technologies = techs;
    }
    if (typeof data.image === 'string' && data.image.length > 0) {
      about.image = data.image;
    }

    return this.repo.save(about);
  }

  async updateAboutMe(data: UpdateAboutMeDto): Promise<AboutMe> {
    const [existing] = await this.repo.find({
      take: 1,
      order: { createdAt: 'DESC' },
    });
    if (!existing) {
      throw new NotFoundException('About Me entry not found');
    }

    if (data.sentences !== undefined) {
      existing.sentences = data.sentences;
    }
    if (data.technologyIds !== undefined) {
      existing.technologies = data.technologyIds.length
        ? await this.technologies.find({
            where: { id: In(data.technologyIds) },
          })
        : [];
    }
    if (typeof data.image === 'string' && data.image.length > 0) {
      existing.image = data.image;
    }

    return this.repo.save(existing);
  }

  async setImage(imageUrl: string): Promise<AboutMe> {
    let about = await this.getAboutMe();
    if (!about) {
      about = this.repo.create({ image: imageUrl });
    } else {
      about.image = imageUrl;
    }
    return this.repo.save(about);
  }

  async removeAboutMe(): Promise<void> {
    const [existing] = await this.repo.find({
      take: 1,
      order: { createdAt: 'DESC' },
    });
    if (!existing) {
      throw new NotFoundException('About Me entry not found');
    }
    await this.repo.delete(existing.id);
  }
}
