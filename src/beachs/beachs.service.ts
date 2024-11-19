import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Beach } from './models/beachs.models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBeachDto } from './dtos/create-beach.dto';
import { User } from 'src/users/models/users.models';
import { UpdateBeachDto } from './dtos/update-beach.dto';

@Injectable()
export class BeachsService {
  constructor(
    @InjectRepository(Beach)
    private readonly beachRepository: Repository<Beach>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // private async retrieveBeachs(): Promise<Beach[]> {
  //   return this.beachRepository.find();
  // }

  async getAllBeachs(): Promise<Beach[]> {
    return this.beachRepository.find();
  }

  async createBeach(userId: number, dto: CreateBeachDto): Promise<Beach> {
    const existingBeach = await this.beachRepository.findOne({
      where: {
        latitude: dto.latitude,
        longitude: dto.longitude,
      },
    });

    if (existingBeach) {
      throw new ConflictException(
        'La playa ya está registrada en esta ubicación.',
      );
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const newBeach = this.beachRepository.create({
      ...dto,
      user: user,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.beachRepository.save(newBeach);
  }

  // async updateBeach(beachId: number, dto: UpdateBeachDto): Promise<void> {
  //   const beach = await this.beachRepository.findOne({
  //     where: { id: beachId },
  //   });

  //   if (!beach) {
  //     throw new NotFoundException(`Playa con ID ${beachId} no encontrada`);
  //   }

  //   //TODO
  // }

  async deleteBeach(beachId: number): Promise<void> {
    const result = await this.beachRepository.delete(beachId);

    if (result.affected === 0) {
      throw new NotFoundException(`Playa con ID ${beachId} no encontrada`);
    }
  }
}
