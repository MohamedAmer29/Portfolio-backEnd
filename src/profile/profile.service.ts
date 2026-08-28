import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private readonly repo: Repository<Profile>,
  ) {}

  async findOne(): Promise<Profile | null> {
    const [profile] = await this.repo.find({
      take: 1,
      order: { createdAt: 'DESC' },
    });
    return profile ?? null;
  }

  create(data: CreateProfileDto) {
    return this.repo.save(this.repo.create(data));
  }

  async updateHero(data: UpdateHeroDto): Promise<Profile> {
    const profile = await this.findOne();
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    if (data.fullName !== undefined) profile.fullName = data.fullName;
    if (data.bio !== undefined) profile.bio = data.bio;
    if (data.description !== undefined) profile.description = data.description;
    return this.repo.save(profile);
  }

  async removeHero(): Promise<void> {
    const profile = await this.findOne();
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    await this.repo.delete(profile.id);
  }
}
