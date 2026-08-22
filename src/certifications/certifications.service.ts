import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certification } from './entities/certification.entity';

@Injectable()
export class CertificationsService {
  constructor(
    @InjectRepository(Certification)
    private readonly repo: Repository<Certification>,
  ) {}
  findAll() {
    return this.repo.find({
      order: { displayOrder: 'ASC', issueDate: 'DESC' },
    });
  }
}
