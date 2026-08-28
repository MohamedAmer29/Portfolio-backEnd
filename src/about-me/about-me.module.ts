import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutMe } from './entities/about-me.entity';
import { Technology } from '../technologies/entities/technology.entity';
import { AboutMeController } from './about-me.controller';
import { AboutMeService } from './about-me.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AboutMe, Technology]),
    AuthModule,
  ],
  controllers: [AboutMeController],
  providers: [AboutMeService],
  exports: [AboutMeService],
})
export class AboutMeModule {}
