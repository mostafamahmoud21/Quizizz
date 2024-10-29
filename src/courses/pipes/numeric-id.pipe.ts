
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any) {
    if(isNaN(Number(value))){
        throw new BadRequestException('Id must be a number')
    }
    return Number(value)
  }
}
