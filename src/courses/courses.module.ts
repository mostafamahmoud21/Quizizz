import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [AuthModule],
  controllers: [CoursesController],
  providers: [CoursesService,PrismaClient],
})
export class CoursesModule {}
