import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    UseGuards,
    Req,
    UsePipes,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
<<<<<<< HEAD
import { TakeQuizDto } from './dto/take-quiz.dto';
=======
>>>>>>> 66e1d7db664d8fb642bf14abfb28b6a14bd7ba04
import { SubmitAnswersDto } from './dto/submit-answers.dto';
import { JwtMiddleware } from 'src/auth/middleware/jwt.middleware';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from '../auth/enums/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { User } from 'src/auth/interfaces/user.interface';
import { Request } from 'express';
import { ValidationPipe } from './pipes/numeric-id.pipe';
import { NotFoundGuard } from './guards/not-found';

@Controller('/api/quizzes')
export class QuizzesController {
    constructor(private readonly quizzesService: QuizzesService) { }

    @Post(':courseId')
    @UseGuards(JwtMiddleware, RolesGuard)
    @Roles(Role.INSTRUCTOR)
    createQuiz(@Param('courseId') courseId: number, @Req() req: Request, @Body() createQuizDto: CreateQuizDto) {
        const instructorId = (req.user as User).id;
        return this.quizzesService.createQuiz(+courseId, createQuizDto, +instructorId);
    }

<<<<<<< HEAD
  @Post(':quizId/take')
  @UseGuards(JwtMiddleware)
  async takeQuiz(@Param('quizId') quizId: string, @Req() req: Request) {
    const studentId = (req.user as User).id;
    return this.quizzesService.takeQuiz(+quizId, studentId);
  }

  @Post(':quizId/answers')
  @UseGuards(JwtMiddleware)
  async submitAnswers(
    @Param('quizId') quizId: string,
    @Body() submitAnswersDto: SubmitAnswersDto,
    @Req() req: Request
  ) {
    const studentId = (req.user as User).id;
    return this.quizzesService.submitAnswers(+quizId, studentId, submitAnswersDto);
  }

  @Get()
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  findAll() {
    return this.quizzesService.getQuizzes();
  }
=======
    @Post('/:courseId/:quizId/take')
    @UseGuards(JwtMiddleware)
    @Roles(Role.STUDENT)
    startQuiz(@Param('courseId') courseId: number,@Param('quizId') quizId: number, @Req() req: Request) {
        const studentId = (req.user as User).id;
        return this.quizzesService.takeQuiz(+quizId, studentId,+courseId);
    }
>>>>>>> 66e1d7db664d8fb642bf14abfb28b6a14bd7ba04

    @Post(':quizId/answers')
    @UseGuards(JwtMiddleware)
    submitQuizAnswers(
        @Param('quizId') quizId: number,
        @Req() req: Request,
        @Body() submitAnswersDto: SubmitAnswersDto
    ) {
        const studentId = (req.user as User).id;
        return this.quizzesService.submitQuizAnswers(+quizId, studentId, submitAnswersDto);
    }

    @Get()
    @UseGuards(JwtMiddleware, RolesGuard)
    @Roles(Role.INSTRUCTOR)
    getAllQuizzes() {
        return this.quizzesService.getQuizzes();
    }

    @Get(':id')
    @UseGuards(JwtMiddleware, RolesGuard)
    @Roles(Role.INSTRUCTOR)
    @UseGuards(NotFoundGuard)
    @UsePipes(ValidationPipe)
    getQuizById(@Param('id') id: number) {
        return this.quizzesService.getQuizById(+id);
    }

    @Patch(':id')
    @UseGuards(JwtMiddleware, RolesGuard)
    @Roles(Role.INSTRUCTOR)
    updateQuiz(
        @Param('id') id: string,
        @Body() updateQuizDto: UpdateQuizDto,
        @Req() req: Request,
    ) {
        const instructorId = (req.user as User).id;
        return this.quizzesService.updateQuiz(+id, updateQuizDto, instructorId);
    }

    @Delete(':id')
    @UseGuards(JwtMiddleware, RolesGuard)
    @Roles(Role.INSTRUCTOR)
    deleteQuiz(@Param('id') id: string, @Req() req: Request) {
        const instructorId = (req.user as User).id;
        return this.quizzesService.deleteQuiz(+id, instructorId);
    }

    @Get(':id/results/student')
    @UseGuards(JwtMiddleware)
    @Roles(Role.STUDENT)
    getStudentQuizResult(@Req() req: Request, @Param('id') id: number) {
        const studentId = (req.user as User).id;
        return this.quizzesService.getResultQuizService(+id, studentId);
    }

    @Get(':id/results/AllStudents')
    @UseGuards(JwtMiddleware, RolesGuard)
    @Roles(Role.INSTRUCTOR)
    getAllStudentsQuizResults(@Req() req: Request, @Param('id') id: number) {
        const instructorId = (req.user as User).id;
        return this.quizzesService.getResultQuizStudentsService(+id, instructorId);
    }
}
