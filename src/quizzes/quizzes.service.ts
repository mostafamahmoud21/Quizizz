import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(private readonly prisma: PrismaClient) { }

  async createQuiz(createQuizDto: CreateQuizDto,instructorId:number) {
    try {
      return await this.prisma.quiz.create({
        data: {
            title: createQuizDto.title,
            description: createQuizDto.description,
            instructorId:instructorId
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to create quiz');
    }
  }

  async findAllQuizzes() {
    try {
      return await this.prisma.quiz.findMany();
    } catch (error) {
      throw new BadRequestException('Failed to retrieve quizzes');
    }
  }

  async findQuizById(id: number) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }

    return quiz;
  }

  async updateQuiz(id: number, updateQuizDto: UpdateQuizDto) {
    await this.ensureQuizExists(id);

    try {
      return await this.prisma.quiz.update({
        where: { id },
        data: updateQuizDto,
      });
    } catch (error) {
      throw new BadRequestException(`Failed to update quiz with ID ${id}`);
    }
  }

  async removeQuiz(id: number) {
    await this.ensureQuizExists(id);

    try {
      return await this.prisma.quiz.delete({
        where: { id },
      });
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
  }
}
