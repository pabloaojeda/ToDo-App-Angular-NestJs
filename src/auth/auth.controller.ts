import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from '../DTO/registerUser.DTO';

//http://localhost:3000/api/auth
@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  registration(@Body(ValidationPipe) regDTO: RegisterUserDto) {
    return this.authService.registerUser(regDTO);
  }
}
