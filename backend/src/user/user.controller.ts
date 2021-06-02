import {Body, Controller, Delete, Get, NotFoundException, Param, Put, Query, UseGuards} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from './user.service';
import {UpdateMessageDto} from "../forum/dto/update-message.dto";
import {UserUpdateDto} from "./dto/user-update.dto";

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

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

  @Get(':id/theme')
  async getTheme(@Param('id') id: number) {
    const user = await this.userService.getUser({ where: { id } });
    if (user)
      return user.theme;
    else
      throw new NotFoundException();
  }

  @Put(':id/theme')
  async updateTheme(@Param('id') id: number, @Query('colorTheme') colorTheme: string) {
    const user = await this.userService.updateUser(id, { theme: colorTheme});
    if (user)
      return user.theme;
    else
      throw new NotFoundException();
  }
}
