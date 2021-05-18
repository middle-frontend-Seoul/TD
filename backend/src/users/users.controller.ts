import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {
  }

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.create(userDto)
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() userDto: UpdateUserDto) {
    return this.userService.update(id, userDto)
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.userService.get(id);
  }

  @Get()
  getAll() {
    return this.userService.getAll()
  }
}
