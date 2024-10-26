import { Injectable, CanActivate, ExecutionContext, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class NotFoundGuard implements CanActivate {
    constructor(private readonly prisma: PrismaClient) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const id = +request.params.id;

        if(isNaN(id)){
            throw new BadRequestException('Id must be a number')
        }

        const quiz = await this.prisma.quiz.findUnique({
            where: { id },
        });

        if (!quiz) {
            throw new NotFoundException(`Quiz with ID ${id} not found`);
        }

        return true;
    }
}
