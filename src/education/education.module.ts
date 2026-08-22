import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Education } from './entities/education.entity';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Education]), AuthModule],
  controllers: [EducationController],
  providers: [EducationService],
})
export class EducationModule {}
