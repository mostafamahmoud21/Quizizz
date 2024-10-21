import { Controller } from '@nestjs/common';
import { ChoicesService } from './choices.service';

@Controller('choices')
export class ChoicesController {
  constructor(private readonly choicesService: ChoicesService) {}
}
