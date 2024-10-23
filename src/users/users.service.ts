import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    
    const newUser = this.userRepository.create(createUserDto); // Crear una nueva instancia
    return  this.userRepository.save(newUser); // Guardar el usuario en la base de datos
}

 // Método para obtener todos los usuarios
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email  });
}

}
