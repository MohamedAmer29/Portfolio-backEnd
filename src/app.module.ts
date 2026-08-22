import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validateEnv } from './config/env.validation';
import { DatabaseModule } from './database/database.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { appConfig } from './config/app.config';
import { ProfileModule } from './profile/profile.module';
import { SkillsModule } from './skills/skills.module';
import { ProjectsModule } from './projects/projects.module';
import { TechnologiesModule } from './technologies/technologies.module';
import { ExperienceModule } from './experience/experience.module';
import { EducationModule } from './education/education.module';
import { CertificationsModule } from './certifications/certifications.module';
import { SocialLinksModule } from './social-links/social-links.module';
import { ServicesModule } from './services/services.module';
import { ContactModule } from './contact/contact.module';
import { AssetsModule } from './assets/assets.module';
import { RedisModule } from './redis/redis.module';
import { EmailModule } from './email/email.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: validateEnv,
      load: [appConfig],
    }),
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 10 }]),
    DatabaseModule,
    ProfileModule,
    SkillsModule,
    ProjectsModule,
    TechnologiesModule,
    ExperienceModule,
    EducationModule,
    CertificationsModule,
    SocialLinksModule,
    ServicesModule,
    ContactModule,
    AssetsModule,
    RedisModule,
    EmailModule,
    HealthModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
