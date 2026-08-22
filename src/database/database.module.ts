import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import pg from 'pg';
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

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const databaseUrl = config.get<string>('DATABASE_URL');
        const databaseHost = config.get<string>('DATABASE_HOST');

        if (databaseUrl) {
          console.log('  PostgreSQL: Using DATABASE_URL (Neon cloud database)');
        } else if (databaseHost) {
          console.log(
            `  PostgreSQL: Using individual credentials - Host: ${databaseHost}`,
          );
        } else {
          console.log('  PostgreSQL: No connection configured');
        }

        return {
          type: 'postgres',
          driver: pg,
          url: databaseUrl ?? undefined,
          host: databaseUrl
            ? undefined
            : config.getOrThrow<string>('DATABASE_HOST'),
          port: databaseUrl
            ? undefined
            : Number(config.getOrThrow<string>('DATABASE_PORT')),
          username: databaseUrl
            ? undefined
            : config.getOrThrow<string>('DATABASE_USERNAME'),
          password: databaseUrl
            ? undefined
            : config.getOrThrow<string>('DATABASE_PASSWORD'),
          database: databaseUrl
            ? undefined
            : config.getOrThrow<string>('DATABASE_NAME'),
          ssl:
            String(config.get<string>('DATABASE_SSL') ?? 'false') === 'true'
              ? {
                  rejectUnauthorized:
                    String(
                      config.get<string>('DATABASE_SSL_REJECT_UNAUTHORIZED') ??
                        'false',
                    ) === 'true',
                }
              : false,
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
          synchronize: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
