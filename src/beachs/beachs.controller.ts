import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Request } from 'express';
import { BeachsService } from './beachs.service';
import { Beach } from './models/beachs.models';
import { CreateBeachDto } from './dtos/create-beach.dto';
import { UpdateBeachDto } from './dtos/update-beach.dto';
import { IsPublic } from 'src/users/decorators/is-public.decorator';

@Controller()
export class BeachsController {
  constructor(private readonly beachsService: BeachsService) {}

  @IsPublic()
  @Get('beachs')
  async getAllBeachs() {
    return this.beachsService.getAllBeachs();
  }

  @Post('beachs/:userId')
  async createBeach(@Param('userId') userId: number, @Body() dto: CreateBeachDto) {
    return this.beachsService.createBeach(userId, dto);
  }

  @Delete('beachs/:beachId')
  async deleteBeach(@Param('beachId') beachId: number) {
    await this.beachsService.deleteBeach(beachId);
  }
}
