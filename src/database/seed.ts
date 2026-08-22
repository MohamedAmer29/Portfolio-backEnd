import 'reflect-metadata';
import { config } from 'dotenv';
import dataSource from './data-source';
import { Profile } from '../profile/entities/profile.entity';
import { Skill } from '../skills/entities/skill.entity';
import { Project } from '../projects/entities/project.entity';
import { Technology } from '../technologies/entities/technology.entity';
import { Experience } from '../experience/entities/experience.entity';
import { Education } from '../education/entities/education.entity';
import { Certification } from '../certifications/entities/certification.entity';
import { SocialLink } from '../social-links/entities/social-link.entity';
import { ServiceOffer } from '../services/entities/service.entity';
import { User, UserRole } from '../users/entities/user.entity';
import {
  SkillCategory,
  ProjectStatus,
  EmploymentType,
} from '../shared/portfolio.enums';
import { AuthService } from '../auth/auth.service';

config();

async function seed() {
  await dataSource.initialize();
  const profileRepo = dataSource.getRepository(Profile);
  const skillRepo = dataSource.getRepository(Skill);
  const techRepo = dataSource.getRepository(Technology);
  const projectRepo = dataSource.getRepository(Project);
  const expRepo = dataSource.getRepository(Experience);
  const eduRepo = dataSource.getRepository(Education);
  const certRepo = dataSource.getRepository(Certification);
  const socialRepo = dataSource.getRepository(SocialLink);
  const serviceRepo = dataSource.getRepository(ServiceOffer);
  const userRepo = dataSource.getRepository(User);
  const authService = new AuthService(userRepo);

  const profile =
    (await profileRepo.findOneBy({ email: 'developer@example.com' })) ??
    profileRepo.create({
      fullName: 'Your Name',
      headline: 'Full Stack Developer',
      bio: 'Professional portfolio bio.',
      shortBio: 'Short bio.',
      email: 'developer@example.com',
      location: 'Remote',
      availabilityStatus: 'AVAILABLE',
    });
  await profileRepo.save(profile);

  await skillRepo.save([
    {
      name: 'React',
      category: SkillCategory.FRONTEND,
      proficiency: 90,
      yearsOfExperience: 4,
      displayOrder: 1,
      isFeatured: true,
    },
    {
      name: 'NestJS',
      category: SkillCategory.BACKEND,
      proficiency: 88,
      yearsOfExperience: 3,
      displayOrder: 2,
      isFeatured: true,
    },
  ]);
  const react =
    (await techRepo.findOneBy({ name: 'React' })) ??
    (await techRepo.save(
      techRepo.create({ name: 'React', category: 'Frontend' }),
    ));
  const nest =
    (await techRepo.findOneBy({ name: 'NestJS' })) ??
    (await techRepo.save(
      techRepo.create({ name: 'NestJS', category: 'Backend' }),
    ));
  const project = await projectRepo.save(
    projectRepo.create({
      title: 'Portfolio Platform',
      slug: 'portfolio-platform',
      shortDescription: 'Developer portfolio',
      description: 'A clean portfolio.',
      status: ProjectStatus.IN_PROGRESS,
      featured: true,
      displayOrder: 1,
      technologies: [react, nest],
    }),
  );
  await expRepo.save({
    company: 'Example Co',
    position: 'Software Engineer',
    description: 'Built web apps.',
    employmentType: EmploymentType.FULL_TIME,
    startDate: '2024-01-01',
    isCurrent: true,
    displayOrder: 1,
  });
  await eduRepo.save({
    institution: 'Example University',
    degree: 'BSc Computer Science',
    fieldOfStudy: 'Computer Science',
    isCurrent: false,
    displayOrder: 1,
  });
  await certRepo.save({
    name: 'AWS Certified',
    issuer: 'Amazon',
    displayOrder: 1,
  });
  await socialRepo.save({
    platform: 'GitHub',
    url: 'https://github.com/yourname',
    username: 'yourname',
    displayOrder: 1,
    isVisible: true,
  });
  await serviceRepo.save({
    title: 'Full Stack Development',
    description: 'Web application development.',
    displayOrder: 1,
    isFeatured: true,
  });

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    const existingAdmin = await userRepo.findOneBy({ email: adminEmail });
    if (!existingAdmin) {
      await userRepo.save(
        userRepo.create({
          email: adminEmail,
          passwordHash: authService.hashPassword(adminPassword),
          role: UserRole.ADMIN,
          isActive: true,
          emailVerified: true,
        }),
      );
    }
  }

  console.log(`Seeded portfolio data with project ${project.slug}`);
  await dataSource.destroy();
}

seed().catch(async (error) => {
  console.error(error);
  await dataSource.destroy().catch(() => undefined);
  process.exit(1);
});
