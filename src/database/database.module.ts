import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
        useFactory: (config: ConfigService) => ({
          type: 'postgres',
        url: config.get<string>('DATABASE_URL') ?? undefined,
        host: config.get<string>('DATABASE_URL')
          ? undefined
          : config.getOrThrow<string>('DATABASE_HOST'),
        port: config.get<string>('DATABASE_URL')
          ? undefined
          : Number(config.getOrThrow<string>('DATABASE_PORT')),
        username: config.get<string>('DATABASE_URL')
          ? undefined
          : config.getOrThrow<string>('DATABASE_USERNAME'),
        password: config.get<string>('DATABASE_URL')
          ? undefined
          : config.getOrThrow<string>('DATABASE_PASSWORD'),
        database: config.get<string>('DATABASE_URL')
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
      }),
    }),
  ],
})
export class DatabaseModule {}
