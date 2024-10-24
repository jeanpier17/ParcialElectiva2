import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  // Registro de usuario
  async register(registerDto: RegisterDto): Promise<User> {
    const { firstName, lastName, email, password } = registerDto;

    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      throw new BadRequestException('El usuario existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.usersService.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    })
}

  
async login({ email, password }: LoginDto) {
  // Buscar al usuario por email
  const user = await this.usersService.findOneByEmail(email);
  if (!user) {
    throw new UnauthorizedException('Email no coincide');
  }

  // Verificar la contraseña
  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    throw new UnauthorizedException('Contraseña no coincide');
  }

  // Crear el payload y firmar el token JWT
  const payload = { sub: user.id, email: user.email }; 
  const token = await this.jwtService.signAsync(payload);

  return {
    accessToken: token,
    userEmail: user.email,
  };
}

  }

