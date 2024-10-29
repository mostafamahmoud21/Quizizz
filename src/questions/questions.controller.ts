import { Body, Controller, Param, ParseIntPipe, Post, Delete, Put, Get, UseGuards, Req } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question-dto';
import { UpdateQuestionDto } from './dto/create-question-dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '../auth/enums/roles.enum';
import { JwtMiddleware } from 'src/auth/middleware/jwt.middleware';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { User } from 'src/auth/interfaces/user.interface';
import { Request } from 'express';

@Controller('quizzes/:quizId/questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  // Create a question
  @Post()
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  async createQuestion(
    @Req() req: Request,
    @Param('quizId', ParseIntPipe) quizId: number,
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    const instructorId = (req.user as User).id;
    return this.questionsService.createQuestion(quizId, createQuestionDto, instructorId);
  }

  // Get all questions for a quiz
  @Get()
  async getQuestions(@Param('quizId', ParseIntPipe) quizId: number) {
    return this.questionsService.getQuestions(quizId);
  }

  // Get a specific question by ID
  @Get(':questionId')
  async getQuestionById(
    @Param('quizId', ParseIntPipe) quizId: number,
    @Param('questionId', ParseIntPipe) questionId: number,
  ) {
    return this.questionsService.getQuestionById(quizId, questionId);
  }

  // Update a question
  @Put(':questionId')
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  async updateQuestion(
    @Req() req: Request,
    @Param('quizId', ParseIntPipe) quizId: number,
    @Param('questionId', ParseIntPipe) questionId: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    const instructorId = (req.user as User).id;
    return this.questionsService.updateQuestion(quizId, questionId, updateQuestionDto, instructorId);
  }

  // Delete a question
  @Delete(':questionId')
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  async deleteQuestion(
    @Req() req: Request,
    @Param('quizId', ParseIntPipe) quizId: number,
    @Param('questionId', ParseIntPipe) questionId: number,
  ) {
    const instructorId = (req.user as User).id;
    return this.questionsService.deleteQuestion(quizId, questionId, instructorId);
  }
}
