import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { validateEnv } from '../config/env.validation';
import { Profile } from '../profile/entities/profile.entity';
import { Skill } from '../skills/entities/skill.entity';
import { Project } from '../projects/entities/project.entity';
import { Technology } from '../technologies/entities/technology.entity';
import { Experience } from '../experience/entities/experience.entity';
import { Education } from '../education/entities/education.entity';
import { Certification } from '../certifications/entities/certification.entity';
import { SocialLink } from '../social-links/entities/social-link.entity';
import { ServiceOffer } from '../services/entities/service.entity';
import { ContactMessage } from '../contact/entities/contact-message.entity';
import { Asset } from '../assets/entities/asset.entity';
import { PortfolioSetting } from '../portfolio-settings/entities/portfolio-setting.entity';
import { User } from '../users/entities/user.entity';
import * as pg from 'pg';

config();
validateEnv(process.env);

const databaseUrl = process.env.DATABASE_URL;
const databaseHost = process.env.DATABASE_HOST;

if (databaseUrl) {
  console.log('  PostgreSQL: Using DATABASE_URL (Neon cloud database)');
} else if (databaseHost) {
  console.log(
    `  PostgreSQL: Using individual credentials - Host: ${databaseHost}`,
  );
} else {
  console.log('  PostgreSQL: No connection configured');
}

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL || undefined,
  host: process.env.DATABASE_URL ? undefined : process.env.DATABASE_HOST,
  port: process.env.DATABASE_URL
    ? undefined
    : Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_URL
    ? undefined
    : process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_URL
    ? undefined
    : process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_URL ? undefined : process.env.DATABASE_NAME,
  ssl: true,
  entities: [
    Profile,
    Skill,
    Project,
    Technology,
    Experience,
    Education,
    Certification,
    SocialLink,
    ServiceOffer,
    ContactMessage,
    Asset,
    PortfolioSetting,
    User,
  ],
  migrations: ['src/database/migrations/*.ts'],
  driver: pg,
  synchronize: false,
  extra: {
    max: 1, // 👈 Restrict pool size per lambda instance
    connectionTimeoutMillis: 5000,
    ssl: {
      rejectUnauthorized: false, // Bypasses self-signed cert validation issues
    },
  },
});
