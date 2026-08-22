import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private readonly repo: Repository<Profile>,
  ) {}
  findOne() {
    return this.repo
      .find({
        take: 1,
        order: { createdAt: 'DESC' },
      })
      .then((rows) => rows[0] ?? null);
  }

  create(data: CreateProfileDto) {
    return this.repo.save(this.repo.create(data));
  }
}
