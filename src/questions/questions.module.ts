import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { PrismaClient } from '@prisma/client';
import { AuthModule } from 'src/auth/auth.module';
import { JwtMiddleware } from 'src/auth/middleware/jwt.middleware';

@Module({
  imports: [AuthModule],
  controllers: [QuestionsController],
  providers: [QuestionsService, PrismaClient],
})
export class QuestionsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware) // Apply the JwtMiddleware
      .forRoutes(QuestionsController); // Apply it to the QuestionsController
  }
}
