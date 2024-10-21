import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizzesModule } from './quizzes/quizzes.module';
import { AuthModule } from './auth/auth.module';
import { QuestionsModule } from './questions/questions.module';
import { ChoicesModule } from './choices/choices.module';

@Module({
  imports: [QuizzesModule, AuthModule, QuestionsModule, ChoicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
