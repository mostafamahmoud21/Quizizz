import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { SubmitAnswersDto } from './dto/submit-answers.dto';

@Injectable()
export class QuizzesService {
    constructor(private readonly prisma: PrismaClient) { }

    async createQuiz(createQuizDto: CreateQuizDto, instructorId: number) {
        try {
            return await this.prisma.quiz.create({
                data: {
                    title: createQuizDto.title,
                    description: createQuizDto.description,
                    instructorId: instructorId,
                },
            });
        } catch (error) {
            throw new BadRequestException('Failed to create quiz');
        }
    }

    async getQuizzes() {
        try {
            return await this.prisma.quiz.findMany();
        } catch (error) {
            throw new BadRequestException('Failed to retrieve quizzes');
        }
    }

    async getQuizById(id: number) {
        return this.ensureQuizExists(id);
    }

    async updateQuiz(id: number, updateQuizDto: UpdateQuizDto, instructorId: number) {
        const quiz = await this.ensureQuizExists(id);

        if (quiz.instructorId !== instructorId) {
            throw new BadRequestException('You do not have permission to update this quiz');
        }

        const updatedData: Partial<UpdateQuizDto> = {};

        if (updateQuizDto.title) {
            updatedData.title = updateQuizDto.title;
        }
        if (updateQuizDto.description) {
            updatedData.description = updateQuizDto.description;
        }

        try {
            return await this.prisma.quiz.update({
                where: { id },
                data: updatedData,
            });
        } catch (error) {
            throw new BadRequestException(`Failed to update quiz with ID ${id}`);
        }
    }


    async deleteQuiz(id: number, instructorId: number) {
        const quiz = await this.ensureQuizExists(id);

        if (quiz.instructorId !== instructorId) {
            throw new BadRequestException('You do not have permission to delete this quiz');
        }

        try {
            await this.prisma.quiz.delete({
                where: { id },
            });
            return { message: `Quiz with ID ${id} has been successfully deleted` };
        } catch (error) {
            throw new BadRequestException(`Failed to delete quiz with ID ${id}`);
        }
    }

    private async ensureQuizExists(id: number) {
        const quiz = await this.prisma.quiz.findUnique({
            where: { id },
        });

        if (!quiz) {
            throw new NotFoundException(`Quiz with ID ${id} not found`);
        }

        return quiz;
    }
    async takeQuiz(quizId: number, studentId: number) {
        try {
            return await this.prisma.quizAttempt.create({
                data: {
                    quiz: { connect: { id: quizId } },
                    student: { connect: { id: studentId } },
                    score: 0, // Initialize score; adjust as needed
                },
            });
        } catch (error) {
            throw new BadRequestException('Failed to start quiz');
        }
    }
    async submitAnswers(quizId: number, studentId: number, answers: SubmitAnswersDto) {
        // Logic to save answers and calculate score if necessary
        try {
            // Implement answer saving logic here
            // For demonstration purposes
            return { message: 'Answers submitted successfully' };
        } catch (error) {
            throw new BadRequestException('Failed to submit answers');
        }
    }
}
