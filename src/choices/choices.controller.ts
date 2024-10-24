import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ChoicesService } from './choices.service';
import { createChoiceDto } from './dto/create-choice.dto';
import { updateChoiceDto } from './dto/update-choice.dto';
import { JwtMiddleware } from 'src/auth/middleware/jwt.middleware';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from '../auth/enums/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { User } from 'src/auth/interfaces/user.interface';
import { Request } from 'express';

@Controller('choices')
export class ChoicesController {
  constructor(private readonly choicesService: ChoicesService) {}

  //** adding choices to a question
  @Post('questions/:questionId')
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  async createChoice(
    @Param('questionId', ParseIntPipe) questionId: number,
    @Req() req: Request,
    @Body() createChoiceDto: createChoiceDto,
  ) {
     const instructorId = (req.user as User).id;
    //const instructorId = 1;
    return this.choicesService.createChoice(
      questionId,
      instructorId,
      createChoiceDto,
    );
  }
  //** editing a choice
  @Put(':id/questions/:questionId')
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  async updateChoice(
    @Param('id', ParseIntPipe) id: number,
    @Param('questionId', ParseIntPipe) questionId: number,
    @Req() req: Request,
    @Body() updateChoiceDto: updateChoiceDto,
  ) {
     const instructorId = (req.user as User).id;
    //const instructorId = 1;
    return this.choicesService.updateChoice(
      id,
      questionId,
      instructorId,
      updateChoiceDto,
    );
  }

   //** delete a choice
   @Delete(':id/questions/:questionId')
   @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.INSTRUCTOR)
   async deleteChoice(
     @Param('id', ParseIntPipe) id: number,
     @Param('questionId', ParseIntPipe) questionId: number,
     @Req() req: Request,
   ) {
      const instructorId = (req.user as User).id;
     //const instructorId = 1;
     return this.choicesService.deleteChoice(
       id,
       questionId,
       instructorId,
     );
   }
}
