import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certification } from './entities/certification.entity';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';

@Injectable()
export class CertificationsService {
  constructor(
    @InjectRepository(Certification)
    private readonly repo: Repository<Certification>,
  ) {}
  findAll() {
    return this.repo.find({ order: { displayOrder: 'ASC', createdAt: 'ASC' } });
  }

  create(data: CreateCertificationDto) {
    return this.repo.save(this.repo.create(data));
  }

  async update(
    id: string,
    data: UpdateCertificationDto,
  ): Promise<Certification> {
    const certification = await this.repo.findOneBy({ id });
    if (!certification) {
      throw new NotFoundException('Certification not found');
    }
    if (data.name !== undefined) certification.name = data.name;
    if (data.issuer !== undefined) certification.issuer = data.issuer;
    if (data.description !== undefined)
      certification.description = data.description;
    if (data.issueDate !== undefined) certification.issueDate = data.issueDate;
    if (data.expirationDate !== undefined)
      certification.expirationDate = data.expirationDate;
    if (data.credentialId !== undefined)
      certification.credentialId = data.credentialId;
    if (data.credentialUrl !== undefined)
      certification.credentialUrl = data.credentialUrl;
    if (data.image !== undefined) certification.image = data.image;
    if (data.displayOrder !== undefined)
      certification.displayOrder = data.displayOrder;
    return this.repo.save(certification);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
