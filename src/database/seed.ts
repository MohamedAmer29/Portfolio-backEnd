import 'reflect-metadata';
import { config } from 'dotenv';
import dataSource from './data-source';
import { skillSeeds } from './skills-seed';
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

  await skillRepo.createQueryBuilder().delete().execute();
  await skillRepo.save(skillRepo.create(skillSeeds));

  // ── delete ALL existing technologies and insert the new 33 ───────────────
  await techRepo.query('DELETE FROM "technologies"');

  // ── 33 new technologies, exactly the list provided ──────────────────────
  const frontend = [
    'React',
    'TypeScript',
    'JavaScript',
    'HTML5',
    'CSS3',
    'Tailwind CSS',
    'Redux Toolkit',
    'TanStack Query',
    'React Hook Form',
    'Three.js',
    'React Three Fiber',
  ];
  const backend = [
    'Node.js',
    'Express.js',
    'NestJS',
    'REST APIs',
    'JWT Authentication',
    'WebSockets / Real-Time Applications',
  ];
  const databases = [
    'PostgreSQL',
    'MongoDB',
    'MySQL',
    'TypeORM',
    'Redis',
    'Firebase',
  ];
  const devops = [
    'Docker',
    'Git',
    'GitHub',
    'Postman',
    'Linux',
    'Vite',
  ];
  const other = [
    'Python',
    'OpenCV',
    'MediaPipe',
    'AI / Machine Learning',
  ];

  const allTechNames = [...frontend, ...backend, ...databases, ...devops, ...other];
  const categoryMap: Record<string, string> = {
    React: 'Frontend',
    TypeScript: 'Frontend',
    JavaScript: 'Frontend',
    HTML5: 'Frontend',
    CSS3: 'Frontend',
    'Tailwind CSS': 'Frontend',
    'Redux Toolkit': 'Frontend',
    'TanStack Query': 'Frontend',
    'React Hook Form': 'Frontend',
    'Three.js': 'Frontend',
    'React Three Fiber': 'Frontend',
    'Node.js': 'Backend',
    'Express.js': 'Backend',
    NestJS: 'Backend',
    'REST APIs': 'Backend',
    'JWT Authentication': 'Backend',
    'WebSockets / Real-Time Applications': 'Backend',
    PostgreSQL: 'Databases & Storage',
    MongoDB: 'Databases & Storage',
    MySQL: 'Databases & Storage',
    TypeORM: 'Databases & Storage',
    Redis: 'Databases & Storage',
    Firebase: 'Databases & Storage',
    Docker: 'DevOps & Tools',
    Git: 'DevOps & Tools',
    GitHub: 'DevOps & Tools',
    Postman: 'DevOps & Tools',
    Linux: 'DevOps & Tools',
    Vite: 'DevOps & Tools',
    Python: 'Other',
    OpenCV: 'Other',
    'MediaPipe': 'Other',
    'AI / Machine Learning': 'Other',
  };

  const slugify = (s: string) =>
    s.toString().toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 50) || 'tech';

  const techData = allTechNames.map((name) => {
    const cat = categoryMap[name];
    const icon = `${name.toLowerCase().replace(/ /g, '-')}-icon`;
    return techRepo.create({ name, category: cat, icon });
  });

  await techRepo.save(techData);

  // ── update the 'portfolio-platform' project techs ──────────────────────
  const projTechFirst = await techRepo.findOneBy({ name: 'React' });
  const projTechSecond = await techRepo.findOneBy({ name: 'TypeScript' });
  const projTechIds2 = projTechFirst && projTechSecond
    ? [projTechFirst, projTechSecond].filter((t): t is Technology => t !== null)
    : [];
  const existingProject = await projectRepo.findOneBy({ slug: 'portfolio-platform' });
  let project: Project;
  if (existingProject) {
    project = existingProject;
    if (projTechIds2.length > 0) project.technologies = projTechIds2;
    await projectRepo.save(project);
  } else {
    project = await projectRepo.save(
      projectRepo.create({
        title: 'Portfolio Platform',
        slug: 'portfolio-platform',
        shortDescription: 'Developer portfolio',
        description: 'A clean portfolio.',
        status: ProjectStatus.IN_PROGRESS,
        featured: true,
        displayOrder: 1,
        technologies: projTechIds2 as Technology[],
      }),
    );
  }

  // ── update the service offer technologies snapshot ─────────────────────
  const existingService = await serviceRepo.findOneBy({ title: 'Full Stack Development' });
  if (existingService) {
    existingService.technologies = allTechNames.slice(0, 5);
    await serviceRepo.save(existingService);
  }

  await expRepo.save({
    company: 'Example Co',
    position: 'Software Engineer',
    description: ['Built web apps.'],
    employmentType: EmploymentType.FULL_TIME,
    startDate: '2024-01-01',
    isCurrent: true,
    displayOrder: 1,
  });
  await eduRepo.save({
    institution: 'University Name',
    degree: "Bachelor's Degree",
    fieldOfStudy: 'Computer Science',
    startDate: '2022',
    endDate: '2026',
    location: 'City, Country',
    description:
      'Studying computer science with a focus on software engineering, algorithms, and web development.',
    coursework: [
      'Software Engineering',
      'Database Systems',
      'Algorithms & Data Structures',
      'Web Development',
      'Computer Networks',
      'Artificial Intelligence',
    ],
    achievements: [],
    academicFocus: [
      'Software Engineering',
      'Database Systems',
      'Algorithms',
      'Web Development',
      'Computer Networks',
      'Artificial Intelligence',
    ],
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
  await serviceRepo.createQueryBuilder().delete().execute();
  const service = serviceRepo.create({
    title: 'Full Stack Development',
    description:
      'I build complete web applications from intuitive, accessible interfaces to scalable APIs, databases, and deployment pipelines.',
    icon: 'Layers',
    number: '01',
    category: 'Full Stack',
    color: '#456e6e',
    emphasis: 'detail',
    technologies: ['React', 'TypeScript', 'Node.js', 'NestJS', 'PostgreSQL'],
    groups: [
      { label: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS'] },
      { label: 'Backend', items: ['Node.js', 'NestJS', 'Express'] },
      { label: 'Database', items: ['PostgreSQL', 'MongoDB', 'TypeORM'] },
      { label: 'DevOps', items: ['Docker', 'Redis', 'CI/CD'] },
    ],
    highlights: [
      'End-to-end delivery: UI, API, domain logic, and data layer.',
      'Clean architecture that stays maintainable as the product grows.',
      'Performance-focused builds with accessibility built in from the start.',
    ],
    displayOrder: 1,
    isFeatured: true,
  });
  await serviceRepo.save(service);

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
