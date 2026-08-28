import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocialLink } from './entities/social-link.entity';
import { CreateSocialLinkDto } from './dto/create-social-link.dto';
import { UpdateSocialLinkDto } from './dto/update-social-link.dto';

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

  create(data: CreateSocialLinkDto) {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: string, data: UpdateSocialLinkDto): Promise<SocialLink> {
    const socialLink = await this.repo.findOneBy({ id });
    if (!socialLink) {
      throw new NotFoundException('Social link not found');
    }
    if (data.platform !== undefined) socialLink.platform = data.platform;
    if (data.url !== undefined) socialLink.url = data.url;
    if (data.username !== undefined) socialLink.username = data.username;
    if (data.icon !== undefined) socialLink.icon = data.icon;
    if (data.displayOrder !== undefined)
      socialLink.displayOrder = data.displayOrder;
    if (data.isVisible !== undefined) socialLink.isVisible = data.isVisible;
    return this.repo.save(socialLink);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
