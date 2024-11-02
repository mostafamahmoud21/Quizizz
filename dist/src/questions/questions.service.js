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
        const createQuestion = await this.prisma.question.create({
            data: {
                ...createQuestionDto,
                instructorId,
            },
        });
        return createQuestion;
    }
    async createOnlyQuestion(createQuestionDto, instructorId) {
        const createQuestion = await this.prisma.question.create({
            data: {
                ...createQuestionDto,
                instructorId,
            },
        });
        return createQuestion;
    }
    async getQuestions(quizId, instructorId) {
        return this.prisma.question.findMany({
            where: {
                instructorId,
            },
        });
    }
    async getQuestionById(instructorId, questionId) {
        const question = await this.prisma.question.findUnique({
            where: { id: questionId },
        });
        if (!question || question.instructorId !== instructorId) {
            throw new common_1.NotFoundException('Question not found or does not belong to the instructor');
        }
        return question;
    }
    async updateQuestion(questionId, updateQuestionDto, instructorId) {
        const question = await this.prisma.question.findUnique({
            where: { id: questionId },
        });
        if (!question || question.instructorId !== instructorId) {
            throw new common_1.NotFoundException('Question not found or does not belong to the instructor');
        }
        return this.prisma.question.update({
            where: { id: questionId },
            data: { ...updateQuestionDto },
        });
    }
    async deleteQuestion(questionId, instructorId) {
        const question = await this.prisma.question.findUnique({
            where: { id: questionId },
        });
        if (!question || question.instructorId !== instructorId) {
            throw new common_1.NotFoundException('Question not found or does not belong to the instructor');
        }
        return this.prisma.question.delete({
            where: { id: questionId },
        });
    }
    async automaticQuestion(quizId, automaticQuestionDto, instructorId) {
        const { numberOfQuestion } = automaticQuestionDto;
        const easyCount = Math.floor(numberOfQuestion * 0.4);
        const mediumCount = Math.floor(numberOfQuestion * 0.4);
        const hardCount = numberOfQuestion - easyCount - mediumCount;
        const easyQuestions = await this.prisma.question.findMany({
            where: { instructorId, level: 'Easy' },
        });
        const mediumQuestions = await this.prisma.question.findMany({
            where: { instructorId, level: 'Medium' },
        });
        const hardQuestions = await this.prisma.question.findMany({
            where: { instructorId, level: 'Hard' },
        });
        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };
        const shuffledEasy = shuffleArray(easyQuestions);
        const shuffledMedium = shuffleArray(mediumQuestions);
        const shuffledHard = shuffleArray(hardQuestions);
        const selectedQuestions = [
            ...shuffledEasy.slice(0, easyCount),
            ...shuffledMedium.slice(0, mediumCount),
            ...shuffledHard.slice(0, hardCount),
        ];
        for (const question of selectedQuestions) {
            await this.prisma.quizQuestion.create({
                data: {
                    quizId,
                    questionId: question.id,
                },
            });
        }
        return selectedQuestions;
    }
};
exports.QuestionsService = QuestionsService;
exports.QuestionsService = QuestionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_1.PrismaClient])
], QuestionsService);
//# sourceMappingURL=questions.service.js.map