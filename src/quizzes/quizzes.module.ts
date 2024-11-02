import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaClient } from '@prisma/client';
import { JwtMiddleware } from '../auth/middleware/jwt.middleware'; 
@Module({
  imports: [AuthModule],
  controllers: [QuizzesController],
  providers: [QuizzesService, PrismaClient],
})
export class QuizzesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware) 
      .forRoutes(QuizzesController); 
  }
}
