import { Injectable, CanActivate, ExecutionContext, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
//import { PrismaClient } from '@prisma/client';

@Injectable()
export class NotFoundGuardqChoice implements CanActivate {
    constructor(private readonly prisma: PrismaService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const id = +request.params.id;

        if(isNaN(id)){
            throw new BadRequestException('Id must be a number')
        }

        const Choice = await this.prisma.choice.findUnique({
            where: { id },
        });

        if (!Choice) {
            throw new NotFoundException(`Choice with ID ${id} not found`);
        }

        return true;
    }
}
