import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization']?.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException('Token is missing');
        }

        try {
            const decoded = this.jwtService.verify(token);
            request.user = decoded; // إضافة المستخدم إلى الطلب
            return true; // السماح بالوصول
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
