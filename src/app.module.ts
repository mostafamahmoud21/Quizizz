import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { QuizzesModule } from './quizzes/quizzes.module';
import { AuthModule } from './auth/auth.module';
import { QuestionsModule } from './questions/questions.module';
import { ChoicesModule } from './choices/choices.module';
import { CoursesModule } from './courses/courses.module';
import { StudentsModule } from './students/students.module';
import * as dotenv from 'dotenv';
import { PrismaService } from './prisma/prisma.service';
import { JwtMiddleware } from './auth/middleware/jwt.middleware';

dotenv.config();

@Module({
  imports: [
    QuizzesModule,
    AuthModule,
    QuestionsModule,
    ChoicesModule,
    CoursesModule,
    StudentsModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}