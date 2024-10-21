"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async registerInstructor(dto) {
        const existingInstructor = await this.prisma.instructor.findUnique({ where: { email: dto.email } });
        if (existingInstructor) {
            throw new common_1.ConflictException('Instructor already exists');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const createdInstructor = await this.prisma.instructor.create({
            data: { ...dto, password: hashedPassword },
            select: {
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return createdInstructor;
    }
    async loginInstructor(dto) {
        const instructor = await this.prisma.instructor.findUnique({
            where: { email: dto.email },
        });
        if (!instructor) {
            throw new common_1.UnauthorizedException('Instructor not found');
        }
        const isPasswordValid = await bcrypt.compare(dto.password, instructor.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const payload = {
            id: instructor.id,
            name: instructor.name,
            email: instructor.email,
        };
        console.log('Signing payload:', payload);
        const token = this.jwtService.sign(payload);
        console.log('Generated token:', token);
        return {
            instructor: instructor,
            access_token: token,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(jwt_1.JwtService)),
    __metadata("design:paramtypes", [client_1.PrismaClient,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map