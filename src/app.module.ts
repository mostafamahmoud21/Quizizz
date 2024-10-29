import { Module } from '@nestjs/common';
import { QuizzesModule } from './quizzes/quizzes.module';
import { AuthModule } from './auth/auth.module';
import { QuestionsModule } from './questions/questions.module';
import { ChoicesModule } from './choices/choices.module';
import * as dotenv from 'dotenv';
import { PrismaService } from './prisma/prisma.service';
import { CoursesModule } from './courses/courses.module';
import { StudentsModule } from './students/students.module';
dotenv.config();

@Module({
  imports: [QuizzesModule, AuthModule, QuestionsModule, ChoicesModule, CoursesModule, StudentsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
