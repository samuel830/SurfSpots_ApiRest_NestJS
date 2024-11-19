import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { SigninUserDto } from './dtos/signin-user.dto';
import { IsPublic } from './decorators/is-public.decorator';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users')
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @IsPublic()
  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    await this.usersService.signUp(dto);
  }

  @IsPublic()
  @Post('signin')
  async signin(@Body() dto: SigninUserDto) {
    return this.usersService.signIn(dto);
  }

  @Get('users/:userId/beachs')
  async getBeachsByUsers(@Param('userId') userId: number) {
    return this.usersService.findBeachsByUser(userId);
  }

  @Patch('users/:userId')
  async giveUserAdmin(@Param('userId') userId: number) {
    return this.usersService.giveAdmin(userId);
  }

  @Delete('users/:userId') 
  async deleteUser(@Param('userId') userId: number) {
    await this.usersService.deleteUser(userId);
  }
}
