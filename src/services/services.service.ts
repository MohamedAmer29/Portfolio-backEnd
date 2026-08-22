import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceOffer } from './entities/service.entity';
import { CreateServiceOfferDto } from './dto/create-service-offer.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServiceOffer)
    private readonly repo: Repository<ServiceOffer>,
  ) {}
  findAll() {
    return this.repo.find({ order: { displayOrder: 'ASC', createdAt: 'ASC' } });
  }

  create(data: CreateServiceOfferDto) {
    return this.repo.save(this.repo.create(data));
  }
}
