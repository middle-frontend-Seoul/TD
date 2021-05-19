import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserService } from './user.service';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() userDto: UserCreateDto) {
    return this.userService.createUser(userDto)
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() userDto: UserUpdateDto) {
    return this.userService.updateUser(id, userDto)
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.userService.getUser({ where: { id } });
  }

  @Get()
  getAll() {
    return this.userService.getAllUsers()
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
