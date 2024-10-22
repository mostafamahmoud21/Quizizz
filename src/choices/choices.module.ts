import { Module } from '@nestjs/common';
import { ChoicesService } from './choices.service';
import { ChoicesController } from './choices.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ChoicesController],
  providers: [ChoicesService, PrismaService],
})
export class ChoicesModule {}
