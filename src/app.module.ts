import { Module } from '@nestjs/common';
import { QuizzesModule } from './quizzes/quizzes.module';
import { AuthModule } from './auth/auth.module';
import { QuestionsModule } from './questions/questions.module';
import { ChoicesModule } from './choices/choices.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [QuizzesModule, AuthModule, QuestionsModule, ChoicesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
