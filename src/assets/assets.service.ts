import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from './entities/asset.entity';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset) private readonly repo: Repository<Asset>,
  ) {}
  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }
}
