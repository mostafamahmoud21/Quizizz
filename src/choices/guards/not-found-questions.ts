import { Injectable, CanActivate, ExecutionContext, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
//import { PrismaClient } from '@prisma/client';

@Injectable()
export class NotFoundGuardqQuestions implements CanActivate {
    constructor(private readonly prisma: PrismaService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const id = +request.params.questionId;

        if(isNaN(id)){
            throw new BadRequestException('Id must be a number')
        }

        const Question = await this.prisma.question.findUnique({
            where: { id },
        });

        if (!Question) {
            throw new NotFoundException(`Question with ID ${id} not found`);
        }

        return true;
    }
}
