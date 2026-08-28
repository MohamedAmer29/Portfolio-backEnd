import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { Technology } from '../technologies/entities/technology.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

export type ProjectResponse = Project & {
  tech: string[];
  github: string;
  external: string;
};

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private readonly repo: Repository<Project>,
    @InjectRepository(Technology)
    private readonly technologies: Repository<Technology>,
  ) {}

  private slugify(input: string): string {
    const slug = input
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 210);
    return slug || 'project';
  }

  private async ensureUniqueSlug(base: string, excludeId?: string): Promise<string> {
    const slug = this.slugify(base);
    let candidate = slug;
    let n = 1;
    for (;;) {
      const existing = await this.repo.findOneBy({ slug: candidate });
      if (!existing || existing.id === excludeId) {
        return candidate;
      }
      candidate = `${slug}-${n++}`;
    }
  }

  private mapProject(p: Project): ProjectResponse {
    const tech = (p.technologies ?? []).map((t) =>
      typeof t === 'string' ? t : (t?.name ?? ''),
    );
    return {
      ...p,
      tech,
      github: p.githubUrl ?? '',
      external: p.liveUrl ?? '',
    };
  }

  async findAll(): Promise<ProjectResponse[]> {
    const list = await this.repo.find({
      order: { featured: 'DESC', displayOrder: 'ASC', createdAt: 'DESC' },
    });
    return list.map((p) => this.mapProject(p));
  }

  async create(data: CreateProjectDto): Promise<ProjectResponse> {
    const slug = await this.ensureUniqueSlug(data.slug || data.title);
    const saved = await this.repo.save(
      this.repo.create({ ...data, slug } as unknown as Record<string, unknown>),
    );
    const reloaded = await this.repo.findOne({ where: { id: saved.id } });
    return this.mapProject(reloaded!);
  }

  async update(id: string, data: UpdateProjectDto): Promise<ProjectResponse> {
    const project = await this.repo.findOneBy({ id });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    if (data.title !== undefined) project.title = data.title;
    if (data.slug !== undefined) {
      project.slug = await this.ensureUniqueSlug(data.slug, id);
    }
    if (data.shortDescription !== undefined)
      project.shortDescription = data.shortDescription;
    if (data.description !== undefined) project.description = data.description;
    if (data.image !== undefined) project.image = data.image;
    if (data.githubUrl !== undefined) project.githubUrl = data.githubUrl;
    if (data.liveUrl !== undefined) project.liveUrl = data.liveUrl;
    if (data.featured !== undefined) project.featured = data.featured;
    if (data.status !== undefined) project.status = data.status;
    if (data.displayOrder !== undefined)
      project.displayOrder = data.displayOrder;
    if (data.startDate !== undefined) project.startDate = data.startDate;
    if (data.endDate !== undefined) project.endDate = data.endDate;
    if (data.technologies !== undefined) {
      project.technologies = data.technologies.length
        ? await this.technologies.find({
            where: { id: In(data.technologies) },
          })
        : [];
    }
    const saved = await this.repo.save(project);
    return this.mapProject(saved);
  }

  async setImage(id: string, imageUrl: string): Promise<ProjectResponse> {
    const project = await this.repo.findOneBy({ id });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    project.image = imageUrl;
    const saved = await this.repo.save(project);
    return this.mapProject(saved);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
