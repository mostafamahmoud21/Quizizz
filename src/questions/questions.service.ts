import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateQuestionDto } from './dto/create-question-dto';
import { UpdateQuestionDto } from './dto/create-question-dto';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaClient) { }

  // Create a new question
  async createQuestion(quizId: number, createQuestionDto: CreateQuestionDto, instructorId: number) {
    const quiz = await this.prisma.quiz.findUnique({ where: { id: quizId } });

    if (!quiz || quiz.instructorId !== instructorId) {
      throw new BadRequestException('You do not have permission to create questions for this quiz');
    }

    return this.prisma.question.create({
      data: {
        ...createQuestionDto,
        quizId,
      },
    },);
    
  }

  // Get all questions for a quiz
  async getQuestions(quizId: number) {
    return this.prisma.question.findMany({
      where: { quizId },
    });
  }

  // Get a specific question by ID
  async getQuestionById(quizId: number, questionId: number) {
    const question = await this.prisma.question.findUnique({
      where: { id: questionId, quizId },
    });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    return question;
  }

  // Update a question
  async updateQuestion(quizId: number, questionId: number, updateQuestionDto: UpdateQuestionDto, instructorId: number) {
    const quiz = await this.prisma.quiz.findUnique({ where: { id: quizId } });

    if (!quiz || quiz.instructorId !== instructorId) {
      throw new BadRequestException('You do not have permission to update questions for this quiz');
    }

    return this.prisma.question.update({
      where: { id: questionId },
      data: { ...updateQuestionDto },
    });
  }

  // Delete a question
  async deleteQuestion(quizId: number, questionId: number, instructorId: number) {
    const quiz = await this.prisma.quiz.findUnique({ where: { id: quizId } });

    if (!quiz || quiz.instructorId !== instructorId) {
      throw new BadRequestException('You do not have permission to delete questions for this quiz');
    }

    return this.prisma.question.delete({
      where: { id: questionId },
    });
  }
}
