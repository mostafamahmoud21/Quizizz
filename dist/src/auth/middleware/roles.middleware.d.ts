import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export declare class RolesMiddleware implements NestMiddleware {
    private readonly roles;
    constructor(roles: string[]);
    use(req: Request, res: Response, next: NextFunction): void;
}
