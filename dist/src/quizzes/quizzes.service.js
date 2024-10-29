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
    async createQuiz(courseId, createQuizDto, instructorId) {
        try {
            return await this.prisma.quiz.create({
                data: {
                    title: createQuizDto.title,
                    description: createQuizDto.description,
                    type: createQuizDto.type,
                    instructorId: instructorId,
                    courseId: courseId
                },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to create quiz');
        }
    }
    async getQuizzes() {
        try {
            return await this.prisma.quiz.findMany();
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve quizzes');
        }
    }
    async getQuizById(id) {
        return this.ensureQuizExists(id);
    }
    async updateQuiz(id, updateQuizDto, instructorId) {
        const quiz = await this.ensureQuizExists(id);
        if (quiz.instructorId !== instructorId) {
            throw new common_1.BadRequestException('You do not have permission to update this quiz');
        }
        const updatedData = {};
        if (updateQuizDto.title) {
            updatedData.title = updateQuizDto.title;
        }
        if (updateQuizDto.type) {
            updatedData.type = updateQuizDto.type;
        }
        if (updateQuizDto.description) {
            updatedData.description = updateQuizDto.description;
        }
        try {
            return await this.prisma.quiz.update({
                where: { id },
                data: updatedData,
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to update quiz with ID ${id}`);
        }
    }
    async deleteQuiz(id, instructorId) {
        const quiz = await this.ensureQuizExists(id);
        if (quiz.instructorId !== instructorId) {
            throw new common_1.BadRequestException('You do not have permission to delete this quiz');
        }
        try {
            await this.prisma.quiz.delete({
                where: { id },
            });
            return { message: `Quiz with ID ${id} has been successfully deleted` };
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to delete quiz with ID ${id}`);
        }
    }
    async getResultQuizService(id, studentId) {
        const score = await this.prisma.quizAttempt.findFirst({
            where: {
                quizId: id,
                studentId: studentId,
            },
        });
        if (!score) {
            throw new common_1.NotFoundException(`No attempt found for quiz ID ${id} by student ID ${studentId}`);
        }
        return {
            message: 'Quiz results ',
            score: score.score,
        };
    }
    async getResultQuizStudentsService(id, instructorId) {
        const checkInstructor = await this.prisma.quiz.findUnique({
            where: {
                id
            }
        });
        if (checkInstructor.instructorId !== instructorId) {
            throw new common_1.BadRequestException('You do not have permission to view results of student');
        }
        const retsults = await this.prisma.quizAttempt.findMany({
            where: {
                quizId: id,
            },
            select: {
                student: {
                    select: {
                        name: true
                    }
                },
                score: true
            }
        });
        return {
            message: 'Quiz results ',
            retsults: retsults
        };
    }
    async ensureQuizExists(id) {
        const quiz = await this.prisma.quiz.findUnique({
            where: { id },
        });
        if (!quiz) {
            throw new common_1.NotFoundException(`Quiz with ID ${id} not found`);
        }
        return quiz;
    }
    async takeQuiz(quizId, studentId, courseId) {
        const enrollment = await this.prisma.enrollment.findFirst({
            where: { studentId, courseId },
        });
        if (!enrollment) {
            throw new common_1.BadRequestException('You need to be enrolled in this course to take the quiz');
        }
        const quiz = await this.prisma.quiz.findFirst({
            where: { id: quizId, courseId },
        });
        if (!quiz) {
            throw new common_1.BadRequestException('This quiz does not belong to the specified course');
        }
        const existingAttempt = await this.prisma.quizAttempt.findFirst({
            where: { quizId, studentId },
        });
        if (existingAttempt) {
            throw new common_1.BadRequestException('You have already taken this quiz');
        }
        try {
            const quizAttempt = await this.prisma.quizAttempt.create({
                data: {
                    quiz: { connect: { id: quizId } },
                    student: { connect: { id: studentId } },
                    score: 0,
                },
            });
            return { message: 'Quiz started successfully', quizAttempt };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to start quiz');
        }
    }
    async submitQuizAnswers(quizId, studentId, submitAnswersDto) {
        await this.ensureQuizExists(quizId);
        const existingAttempt = await this.prisma.quizAttempt.findFirst({
            where: { quizId, studentId },
        });
        if (!existingAttempt) {
            throw new common_1.BadRequestException('You need to start the quiz before submitting answers.');
        }
        let scoreStudent = 0;
        const answers = submitAnswersDto.answers.map((ans) => ({
            questionId: ans.questionId,
            studentId,
            text: ans.answerText,
        }));
        try {
            await this.prisma.answer.createMany({ data: answers });
            const correctAnswers = await this.prisma.question.findMany({
                where: { id: { in: answers.map((ans) => ans.questionId) } },
                select: { id: true, correctAnswer: true },
            });
            scoreStudent = answers.reduce((score, answer) => {
                const correctAnswer = correctAnswers.find((q) => q.id === answer.questionId);
                return correctAnswer && answer.text === correctAnswer.correctAnswer ? score + 1 : score;
            }, 0);
            await this.prisma.quizAttempt.update({
                where: { id: existingAttempt.id },
                data: { score: scoreStudent },
            });
            return { message: 'Answers submitted successfully', score: scoreStudent };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to submit answers');
        }
    }
};
exports.QuizzesService = QuizzesService;
exports.QuizzesService = QuizzesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_1.PrismaClient])
], QuizzesService);
//# sourceMappingURL=quizzes.service.js.map