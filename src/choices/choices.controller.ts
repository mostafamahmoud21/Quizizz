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

@Controller('choices')
export class ChoicesController {
  constructor(private readonly choicesService: ChoicesService) {}

  //** adding choices to a question
  @Post('questions/:questionId')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Instructor)
  async createChoice(
    @Param('questionId', ParseIntPipe) questionId: number,
    @Req() req: Request,
    @Body() createChoiceDto: createChoiceDto,
  ) {
    // const instructorId = (req.user as User).id;
    const instructorId = 1;
    return this.choicesService.createChoice(
      questionId,
      instructorId,
      createChoiceDto,
    );
  }
  //** editing a choice
  @Put(':id/questions/:questionId')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Instructor)
  async updateChoice(
    @Param('id', ParseIntPipe) id: number,
    @Param('questionId', ParseIntPipe) questionId: number,
    @Req() req: Request,
    @Body() updateChoiceDto: updateChoiceDto,
  ) {
    // const instructorId = (req.user as User).id;
    const instructorId = 1;
    return this.choicesService.updateChoice(
      id,
      questionId,
      instructorId,
      updateChoiceDto,
    );
  }

   //** delete a choice
   @Delete(':id/questions/:questionId')
   // @UseGuards(JwtAuthGuard, RolesGuard)
   // @Roles(Role.Instructor)
   async deleteChoice(
     @Param('id', ParseIntPipe) id: number,
     @Param('questionId', ParseIntPipe) questionId: number,
     @Req() req: Request,
   ) {
     // const instructorId = (req.user as User).id;
     const instructorId = 1;
     return this.choicesService.deleteChoice(
       id,
       questionId,
       instructorId,
     );
   }
}
