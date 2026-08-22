import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from './entities/asset.entity';
import { CreateAssetDto } from './dto/create-asset.dto';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset) private readonly repo: Repository<Asset>,
  ) {}
  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  create(data: CreateAssetDto) {
    return this.repo.save(this.repo.create(data));
  }
}
