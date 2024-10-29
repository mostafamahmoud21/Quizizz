import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
//import { JwtMiddleware } from './auth/middleware/jwt.middleware';
import { JwtService } from '@nestjs/jwt';
import {Request,Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );


  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
