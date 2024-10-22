import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';

  import { Role } from '../enums/roles.enum';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const roles = this.reflector.get<Role[]>('roles', context.getHandler());
      if (!roles) {
        return true; // No roles specified, allow access
      }
  
      const request = context.switchToHttp().getRequest();
      const user = request.user; // Assuming user is set after JWT validation
  
      if (!user || !roles.includes(user.role)) {
        throw new ForbiddenException('Access denied');
      }
      return true;
    }
  }
  