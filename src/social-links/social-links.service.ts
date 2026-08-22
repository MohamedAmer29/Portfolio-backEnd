import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocialLink } from './entities/social-link.entity';

@Injectable()
export class SocialLinksService {
  constructor(
    @InjectRepository(SocialLink) private readonly repo: Repository<SocialLink>,
  ) {}
  findAll() {
    return this.repo.find({
      where: { isVisible: true },
      order: { displayOrder: 'ASC' },
    });
  }
}
