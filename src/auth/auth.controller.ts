import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterInstructorDto } from './dto/instructor/register.dto';
import { LoginInstructorDto } from './dto/instructor/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

 
@Post('instructor/register')
registerInstructor(@Body() dto:RegisterInstructorDto){
  return this.authService.registerInstructor(dto)
}


@Post('instructor/login')
loginInstructor(@Body() dto:LoginInstructorDto){ 
  return this.authService.loginInstructor(dto)
}
}