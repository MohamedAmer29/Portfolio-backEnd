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
        host: config.getOrThrow<string>('DATABASE_HOST'),
        port: Number(config.getOrThrow<string>('DATABASE_PORT')),
        username: config.getOrThrow<string>('DATABASE_USERNAME'),
        password: config.getOrThrow<string>('DATABASE_PASSWORD'),
        database: config.getOrThrow<string>('DATABASE_NAME'),
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
        synchronize: false,
      }),
    }),
  ],
})
export class DatabaseModule {}
