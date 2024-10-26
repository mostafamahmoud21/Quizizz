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

        const course = await this.prisma.course.findUnique({
            where: { id },
        });

        if (!course) {
            throw new NotFoundException(`Course with id ${id} not found`);
        }

        return true;
    }
}
