import { CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export declare class NotFoundGuard implements CanActivate {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
