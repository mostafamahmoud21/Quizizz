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
exports.QuestionsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let QuestionsService = class QuestionsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createQuestion(quizId, createQuestionDto, instructorId) {
        const quiz = await this.prisma.quiz.findUnique({ where: { id: quizId } });
        if (!quiz || quiz.instructorId !== instructorId) {
            throw new common_1.BadRequestException('You do not have permission to create questions for this quiz');
        }
        return this.prisma.question.create({
            data: {
                ...createQuestionDto,
                quizId,
            },
        });
    }
    async getQuestions(quizId) {
        return this.prisma.question.findMany({
            where: { quizId },
        });
    }
    async getQuestionById(quizId, questionId) {
        const question = await this.prisma.question.findUnique({
            where: { id: questionId, quizId },
        });
        if (!question) {
            throw new common_1.NotFoundException('Question not found');
        }
        return question;
    }
    async updateQuestion(quizId, questionId, updateQuestionDto, instructorId) {
        const quiz = await this.prisma.quiz.findUnique({ where: { id: quizId } });
        if (!quiz || quiz.instructorId !== instructorId) {
            throw new common_1.BadRequestException('You do not have permission to update questions for this quiz');
        }
        return this.prisma.question.update({
            where: { id: questionId },
            data: { ...updateQuestionDto },
        });
    }
    async deleteQuestion(quizId, questionId, instructorId) {
        const quiz = await this.prisma.quiz.findUnique({ where: { id: quizId } });
        if (!quiz || quiz.instructorId !== instructorId) {
            throw new common_1.BadRequestException('You do not have permission to delete questions for this quiz');
        }
        return this.prisma.question.delete({
            where: { id: questionId },
        });
    }
};
exports.QuestionsService = QuestionsService;
exports.QuestionsService = QuestionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_1.PrismaClient])
], QuestionsService);
//# sourceMappingURL=questions.service.js.map