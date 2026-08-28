import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from './entities/asset.entity';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

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

  async update(id: string, data: UpdateAssetDto): Promise<Asset> {
    const asset = await this.repo.findOneBy({ id });
    if (!asset) {
      throw new NotFoundException('Asset not found');
    }
    if (data.name !== undefined) asset.name = data.name;
    if (data.url !== undefined) asset.url = data.url;
    if (data.type !== undefined) asset.type = data.type;
    if (data.altText !== undefined) asset.altText = data.altText;
    if (data.description !== undefined) asset.description = data.description;
    return this.repo.save(asset);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
