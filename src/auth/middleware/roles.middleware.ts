import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { User } from '../interfaces/user.interface'; // Adjust path

@Injectable()
export class RolesMiddleware implements NestMiddleware {
  constructor(private readonly roles: string[]) {}


  use(req: Request, res: Response, next: NextFunction) {
    const user = req.user as User; // Cast user to User type

    if (!user || !user.role) {
      throw new ForbiddenException('Access denied');
    }

    if (!this.roles.includes(user.role)) {
      throw new ForbiddenException('You do not have permission to access this resource');
    }

    next();
  }
}
