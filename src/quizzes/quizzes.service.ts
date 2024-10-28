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

    async createQuiz(courseId: number, createQuizDto: CreateQuizDto, instructorId: number) {
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

    async getResultQuizService(id: number, studentId: number) {
    
        const score = await this.prisma.quizAttempt.findFirst({
            where: {
                quizId: id,
                studentId: studentId,
            },
        });
    
        if (!score) {
            throw new NotFoundException(`No attempt found for quiz ID ${id} by student ID ${studentId}`);
        }
    
        return {
            message: 'Quiz results ',
            score: score.score, 
        };
    }
    
    async getResultQuizStudentsService(id: number, instructorId: number) {
        const checkInstructor=await this.prisma.quiz.findUnique({
            where:{
                id
            }
        })

        if(checkInstructor.instructorId!==instructorId){
            throw new BadRequestException('You do not have permission to view results of student');
        }

        
        const retsults = await this.prisma.quizAttempt.findMany({
            where: {
                quizId: id,
            },
            select:{
                student:{
                    select:{
                        name:true
                    }
                },
                score:true
            }
        });

    
        return {
            message: 'Quiz results ',
            retsults:retsults 
        };
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
        const quiz = await this.prisma.quiz.findUnique({
            where: { id: quizId },
        })
        if (!quiz) {
            throw new NotFoundException(`Quiz with ID ${quizId} not found`);
        }

        const existingAttempt = await this.prisma.quizAttempt.findFirst({
            where: {
                quizId: quizId,
                studentId: studentId,
            }
        })

        if (existingAttempt) {
            throw new BadRequestException('You have already taken this quiz');
        }

        try {
            const quizAttempt = await this.prisma.quizAttempt.create({
                data: {
                    quiz: { connect: { id: quizId } },
                    student: { connect: { id: studentId } },
                    score: 0,
                },
            });

            return {
                message: 'Quiz started successfully',
                quizAttempt,
            };
        } catch (error) {
            throw new BadRequestException('Failed to start quiz');
        }
    }

    async submitQuizAnswers(quizId: number, studentId: number, submitAnswersDto: SubmitAnswersDto) {
        const quiz = await this.ensureQuizExists(quizId);
        let scoreStudent = 0;
        const existingAttempt = await this.prisma.quizAttempt.findFirst({
            where: { quizId, studentId },
        });

        if (!existingAttempt) {
            throw new BadRequestException('You need to start the quiz before submitting answers.');
        }

        try {
            const answers = submitAnswersDto.answers.map((ans) => ({
                questionId: ans.questionId,
                studentId,
                text: ans.answerText,
            }));

            await this.prisma.answer.createMany({ data: answers });

            for (const ans of answers) {
                const correctAnswer = await this.prisma.question.findUnique({
                    where: { id: ans.questionId },
                    select: { correctAnswer: true },
                });

                if (!correctAnswer) {
                    throw new NotFoundException(`Question with ID ${ans.questionId} not found`);
                }

                if (ans.text === correctAnswer.correctAnswer) {
                    scoreStudent++;
                }
            }

            await this.prisma.quizAttempt.update({
                where: { id: existingAttempt.id },
                data: { score: scoreStudent },
            });

            return { message: 'Answers submitted successfully', score: scoreStudent };
        } catch (error) {
            throw new BadRequestException('Failed to submit answers');
        }
    }


}
