import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceOffer } from './entities/service.entity';
import { CreateServiceOfferDto } from './dto/create-service-offer.dto';
import { UpdateServiceOfferDto } from './dto/update-service-offer.dto';

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

  async update(id: string, data: UpdateServiceOfferDto): Promise<ServiceOffer> {
    const serviceOffer = await this.repo.findOneBy({ id });
    if (!serviceOffer) {
      throw new NotFoundException('Service offer not found');
    }
    if (data.title !== undefined) serviceOffer.title = data.title;
    if (data.description !== undefined)
      serviceOffer.description = data.description;
    if (data.icon !== undefined) serviceOffer.icon = data.icon;
    if (data.number !== undefined) serviceOffer.number = data.number;
    if (data.category !== undefined) serviceOffer.category = data.category;
    if (data.color !== undefined) serviceOffer.color = data.color;
    if (data.emphasis !== undefined) serviceOffer.emphasis = data.emphasis;
    if (data.technologies !== undefined)
      serviceOffer.technologies = data.technologies;
    if (data.groups !== undefined) serviceOffer.groups = data.groups;
    if (data.highlights !== undefined) serviceOffer.highlights = data.highlights;
    if (data.displayOrder !== undefined)
      serviceOffer.displayOrder = data.displayOrder;
    if (data.isFeatured !== undefined) serviceOffer.isFeatured = data.isFeatured;
    return this.repo.save(serviceOffer);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
