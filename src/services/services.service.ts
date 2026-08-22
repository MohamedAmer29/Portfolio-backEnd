import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceOffer } from './entities/service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServiceOffer)
    private readonly repo: Repository<ServiceOffer>,
  ) {}
  findAll() {
    return this.repo.find({
      order: { isFeatured: 'DESC', displayOrder: 'ASC' },
    });
  }
}
