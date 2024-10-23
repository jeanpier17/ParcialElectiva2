import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto'; // Importar RegisterDto
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Registro de usuario
  @Post('register')
  async register(@Body() registerDto: RegisterDto) { // Cambiado a RegisterDto
    return this.authService.register(registerDto); // Llamar al método de registro
  }

  // Login de usuario
  @Post('login')
  async login(@Body() loginDto: LoginDto,
) {
    return this.authService.login(loginDto);
    

  }
}
