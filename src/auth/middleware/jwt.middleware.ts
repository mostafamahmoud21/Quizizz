import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) {}

    use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('Token is missing');
        }

        try {
            const decoded = this.jwtService.verify(token);
            req.user = decoded; // Ensure `decoded` contains user data
            console.log('Decoded JWT:', decoded); // Log to check structure
            next();
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
