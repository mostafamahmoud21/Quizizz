import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaClient } from '@prisma/client';
import { JwtMiddleware } from 'src/auth/middleware/jwt.middleware';

@Module({
  imports: [AuthModule],
  controllers: [CoursesController],
  providers: [CoursesService, PrismaClient],
})
export class CoursesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware) // Apply JwtMiddleware here
      .forRoutes(CoursesController); // Specify the routes to apply it to
  }
}
