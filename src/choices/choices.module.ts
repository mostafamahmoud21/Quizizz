import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ChoicesService } from './choices.service';
import { ChoicesController } from './choices.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtMiddleware } from 'src/auth/middleware/jwt.middleware';

@Module({
  imports: [AuthModule],
  controllers: [ChoicesController],
  providers: [ChoicesService, PrismaService],
})
export class ChoicesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware) // Apply the JwtMiddleware
      .forRoutes(ChoicesController); // Apply it to the ChoicesController
  }
}
