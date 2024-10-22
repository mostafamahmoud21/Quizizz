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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizzesService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let QuizzesService = class QuizzesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createQuiz(createQuizDto, instructorId) {
        try {
            return await this.prisma.quiz.create({
                data: {
                    title: createQuizDto.title,
                    description: createQuizDto.description,
                    instructorId: instructorId
                },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to create quiz');
        }
    }
    async findAllQuizzes() {
        try {
            return await this.prisma.quiz.findMany();
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve quizzes');
        }
    }
    async findQuizById(id) {
        const quiz = await this.prisma.quiz.findUnique({
            where: { id },
        });
        if (!quiz) {
            throw new common_1.NotFoundException(`Quiz with ID ${id} not found`);
        }
        return quiz;
    }
    async updateQuiz(id, updateQuizDto) {
        await this.ensureQuizExists(id);
        try {
            return await this.prisma.quiz.update({
                where: { id },
                data: updateQuizDto,
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to update quiz with ID ${id}`);
        }
    }
    async removeQuiz(id) {
        await this.ensureQuizExists(id);
        try {
            return await this.prisma.quiz.delete({
                where: { id },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to delete quiz with ID ${id}`);
        }
    }
    async ensureQuizExists(id) {
        const quiz = await this.prisma.quiz.findUnique({
            where: { id },
        });
        if (!quiz) {
            throw new common_1.NotFoundException(`Quiz with ID ${id} not found`);
        }
    }
};
exports.QuizzesService = QuizzesService;
exports.QuizzesService = QuizzesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_1.PrismaClient])
], QuizzesService);
//# sourceMappingURL=quizzes.service.js.map