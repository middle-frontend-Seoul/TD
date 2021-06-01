import {Controller, Delete, Get, NotFoundException, Param, UseGuards} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from './user.service';

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

  @Get('theme/:id')
  async getTheme(@Param('id') id: number) {
    const user = await this.userService.getUser({ where: { id } });
    if (user)
      return user.theme;
    else
      throw new NotFoundException();
  }
}
