import { SkillCategory } from '../shared/portfolio.enums';
import type { Skill } from '../skills/entities/skill.entity';

export type SkillSeed = Omit<
  Skill,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
> & {};

type SeedEntry = {
  name: string;
  category: SkillCategory;
  proficiency: number;
  yearsOfExperience: number;
  description: string;
  related: string[];
  isFeatured?: boolean;
  icon?: string;
};

const entries: SeedEntry[] = [
  // ── Frontend ──────────────────────────────────────────────────────────────
  {
    name: 'React',
    category: SkillCategory.FRONTEND,
    proficiency: 95,
    yearsOfExperience: 4,
    description:
      'Component-based UI library for building interactive web applications',
    related: ['TypeScript', 'Redux Toolkit', 'Tailwind CSS'],
    isFeatured: true,
  },
  {
    name: 'TypeScript',
    category: SkillCategory.FRONTEND,
    proficiency: 92,
    yearsOfExperience: 3.5,
    description: 'Typed superset of JavaScript for scalable, maintainable code',
    related: ['React', 'Node.js', 'NestJS'],
    isFeatured: true,
  },
  {
    name: 'JavaScript',
    category: SkillCategory.FRONTEND,
    proficiency: 93,
    yearsOfExperience: 5,
    description: 'Core language of the web, powering both client and server',
    related: ['React', 'TypeScript', 'Node.js'],
    isFeatured: true,
  },
  {
    name: 'HTML5',
    category: SkillCategory.FRONTEND,
    proficiency: 95,
    yearsOfExperience: 6,
    description: 'Semantic markup for accessible, SEO-friendly web pages',
    related: ['CSS3', 'JavaScript'],
  },
  {
    name: 'CSS3',
    category: SkillCategory.FRONTEND,
    proficiency: 90,
    yearsOfExperience: 6,
    description: 'Styling language for layout, animations, and responsive design',
    related: ['Tailwind CSS', 'HTML5'],
  },
  {
    name: 'Tailwind CSS',
    category: SkillCategory.FRONTEND,
    proficiency: 90,
    yearsOfExperience: 3,
    description: 'Utility-first CSS framework for rapid UI development',
    related: ['CSS3', 'React'],
    isFeatured: true,
  },
  {
    name: 'Redux Toolkit',
    category: SkillCategory.FRONTEND,
    proficiency: 85,
    yearsOfExperience: 2.5,
    description: 'Predictable state container for complex application logic',
    related: ['React', 'TypeScript'],
  },
  {
    name: 'TanStack Query',
    category: SkillCategory.FRONTEND,
    proficiency: 85,
    yearsOfExperience: 2,
    description: 'Powerful data synchronization and caching for server state',
    related: ['React', 'TypeScript'],
  },
  {
    name: 'React Hook Form',
    category: SkillCategory.FRONTEND,
    proficiency: 82,
    yearsOfExperience: 2,
    description: 'Performant forms with minimal re-renders and easy validation',
    related: ['React', 'TypeScript'],
  },
  {
    name: 'Three.js',
    category: SkillCategory.FRONTEND,
    proficiency: 80,
    yearsOfExperience: 2,
    description: 'JavaScript 3D library for building WebGL experiences',
    related: ['React Three Fiber', 'React', 'JavaScript'],
  },
  {
    name: 'React Three Fiber',
    category: SkillCategory.FRONTEND,
    proficiency: 78,
    yearsOfExperience: 1.5,
    description: 'Declarative Three.js renderer for React applications',
    related: ['Three.js', 'React'],
  },

  // ── Backend ───────────────────────────────────────────────────────────────
  {
    name: 'Node.js',
    category: SkillCategory.BACKEND,
    proficiency: 88,
    yearsOfExperience: 4.5,
    description: 'JavaScript runtime for building scalable server applications',
    related: ['Express.js', 'NestJS', 'TypeScript'],
    isFeatured: true,
  },
  {
    name: 'Express.js',
    category: SkillCategory.BACKEND,
    proficiency: 85,
    yearsOfExperience: 3.5,
    description: 'Minimal and flexible Node.js web application framework',
    related: ['Node.js', 'REST APIs', 'JWT Authentication'],
  },
  {
    name: 'NestJS',
    category: SkillCategory.BACKEND,
    proficiency: 87,
    yearsOfExperience: 3,
    description: 'Progressive Node.js framework for enterprise-grade APIs',
    related: ['TypeScript', 'TypeORM', 'PostgreSQL'],
    isFeatured: true,
  },
  {
    name: 'REST APIs',
    category: SkillCategory.BACKEND,
    proficiency: 90,
    yearsOfExperience: 4,
    description: 'Architectural style for designing networked applications',
    related: ['Node.js', 'Express.js', 'NestJS'],
  },
  {
    name: 'JWT Authentication',
    category: SkillCategory.BACKEND,
    proficiency: 82,
    yearsOfExperience: 3,
    description: 'Token-based authentication for secure API access',
    related: ['REST APIs', 'Node.js'],
  },
  {
    name: 'WebSockets / Real-Time Applications',
    category: SkillCategory.BACKEND,
    proficiency: 80,
    yearsOfExperience: 2.5,
    description: 'Full-duplex communication channels over a single TCP connection',
    related: ['Node.js', 'Redis'],
  },

  // ── Databases & Storage ───────────────────────────────────────────────────
  {
    name: 'PostgreSQL',
    category: SkillCategory.DATABASE,
    proficiency: 87,
    yearsOfExperience: 3.5,
    description: 'Advanced open-source relational database for complex queries',
    related: ['TypeORM', 'NestJS'],
    isFeatured: true,
  },
  {
    name: 'MongoDB',
    category: SkillCategory.DATABASE,
    proficiency: 83,
    yearsOfExperience: 3,
    description: 'Document-oriented NoSQL database for flexible data models',
    related: ['Node.js', 'REST APIs'],
  },
  {
    name: 'MySQL',
    category: SkillCategory.DATABASE,
    proficiency: 82,
    yearsOfExperience: 3,
    description: 'Widely-used open-source relational database management system',
    related: ['TypeORM', 'Node.js'],
  },
  {
    name: 'TypeORM',
    category: SkillCategory.DATABASE,
    proficiency: 84,
    yearsOfExperience: 3,
    description: 'TypeScript ORM for Node.js with multi-database support',
    related: ['PostgreSQL', 'MySQL', 'NestJS'],
  },
  {
    name: 'Redis',
    category: SkillCategory.DATABASE,
    proficiency: 80,
    yearsOfExperience: 2.5,
    description: 'In-memory data store used as cache, message broker, and database',
    related: ['Node.js', 'WebSockets / Real-Time Applications'],
  },
  {
    name: 'Firebase',
    category: SkillCategory.DATABASE,
    proficiency: 78,
    yearsOfExperience: 2,
    description: 'Backend-as-a-service for auth, databases, and hosting',
    related: ['Node.js', 'React'],
  },

  // ── DevOps & Tools ────────────────────────────────────────────────────────
  {
    name: 'Docker',
    category: SkillCategory.DEVOPS,
    proficiency: 84,
    yearsOfExperience: 3,
    description: 'Platform for developing, shipping, and running containers',
    related: ['Linux', 'GitHub'],
    isFeatured: true,
  },
  {
    name: 'Git',
    category: SkillCategory.DEVOPS,
    proficiency: 90,
    yearsOfExperience: 5,
    description: 'Distributed version control system for tracking code changes',
    related: ['GitHub'],
  },
  {
    name: 'GitHub',
    category: SkillCategory.DEVOPS,
    proficiency: 88,
    yearsOfExperience: 4,
    description: 'Cloud platform for version control and collaboration',
    related: ['Git'],
  },
  {
    name: 'Postman',
    category: SkillCategory.DEVOPS,
    proficiency: 85,
    yearsOfExperience: 4,
    description: 'API platform for designing, testing, and documenting APIs',
    related: ['REST APIs'],
  },
  {
    name: 'Linux',
    category: SkillCategory.DEVOPS,
    proficiency: 80,
    yearsOfExperience: 4,
    description: 'Open-source operating system for servers and development',
    related: ['Docker', 'Git'],
  },
  {
    name: 'Vite',
    category: SkillCategory.DEVOPS,
    proficiency: 85,
    yearsOfExperience: 2.5,
    description: 'Fast development and build tool for modern web apps',
    related: ['React', 'TypeScript', 'Tailwind CSS'],
  },

  // ── Other ─────────────────────────────────────────────────────────────────
  {
    name: 'Python',
    category: SkillCategory.AI,
    proficiency: 82,
    yearsOfExperience: 3,
    description: 'Versatile language widely used in AI, ML, and data science',
    related: ['OpenCV', 'MediaPipe', 'AI / Machine Learning'],
  },
  {
    name: 'OpenCV',
    category: SkillCategory.AI,
    proficiency: 78,
    yearsOfExperience: 2,
    description: 'Open-source library for real-time computer vision',
    related: ['Python', 'AI / Machine Learning'],
  },
  {
    name: 'MediaPipe',
    category: SkillCategory.AI,
    proficiency: 76,
    yearsOfExperience: 1.5,
    description: 'Google framework for building multimodal ML pipelines',
    related: ['Python', 'AI / Machine Learning'],
  },
  {
    name: 'AI / Machine Learning',
    category: SkillCategory.AI,
    proficiency: 75,
    yearsOfExperience: 2,
    description: 'Algorithms that learn patterns from data to make predictions',
    related: ['Python', 'OpenCV'],
  },
];

export const skillSeeds: SkillSeed[] = entries.map((entry, index) => ({
  ...entry,
  displayOrder: index + 1,
  isFeatured: entry.isFeatured ?? false,
}));