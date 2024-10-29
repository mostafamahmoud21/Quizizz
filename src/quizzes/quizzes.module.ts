import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { AuthModule } from '../auth/auth.module'; 
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [AuthModule], 
  controllers: [QuizzesController],
  providers: [QuizzesService, PrismaClient],
})
export class QuizzesModule {}
