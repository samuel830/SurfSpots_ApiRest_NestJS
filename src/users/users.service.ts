import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/users.models';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Beach } from 'src/beachs/models/beachs.models';
import { SigninUserDto } from './dtos/signin-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  private async retrieveUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getAllUsers(): Promise<User[]> {
    return this.retrieveUsers();
  }

  async signUp(dto: CreateUserDto) {
    const newUser = this.userRepository.create({
      email: dto.email,
      password: await bcrypt.hash(dto.password, 12),
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    this.userRepository.save(newUser);
  }

  async signIn(dto: SigninUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
    });

    if(!user){
      throw new UnauthorizedException();
    }

    const matches = await bcrypt.compare(dto.password, user.password);
    
    if(!matches){
      throw new UnauthorizedException();
    }

    return {
      token: await this.jwtService.signAsync({
        id: user.id,
        email: user.email,
        role: user.role
      }),
    };
  } 

  async findBeachsByUser(userId: number): Promise<Beach[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['beachs'],
    });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user.beachs;
  }

  async giveAdmin(userId: number): Promise<void>{
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if(user.role != "admin"){
      user.role = "admin";
      this.userRepository.save(user);
    }else{
      console.log("El usuario ya es admin");
    }
    
  }

  async deleteUser(userId: number): Promise<void> {
    const result = await this.userRepository.delete(userId);

    if (result.affected === 0) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrada`);
    }
  }
}
