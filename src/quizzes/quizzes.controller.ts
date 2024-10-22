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
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { JwtMiddleware } from 'src/auth/middleware/jwt.middleware';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from '../auth/enums/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { User } from 'src/auth/interfaces/user.interface';
import { Request } from 'express';

@Controller('/api/quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) { }

  @Post()
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  create(@Req() req: Request, @Body() createQuizDto: CreateQuizDto) {
    const instructorId = (req.user as User).id;
    return this.quizzesService.createQuiz(createQuizDto, instructorId);
  }

  @Get()
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  findAll() {
    return this.quizzesService.getQuizzes();
  }

  @Get(':id')
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  findOne(@Param('id') id: string) {
    return this.quizzesService.getQuizById(+id);
  }

  @Patch(':id')
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  update(
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
  remove(@Param('id') id: string, @Req() req: Request) {
    const instructorId = (req.user as User).id;
    return this.quizzesService.deleteQuiz(+id, instructorId);
  }
}
