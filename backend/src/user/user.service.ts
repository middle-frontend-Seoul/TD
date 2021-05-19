import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    await this.userRepository.update(dto, { where: { id } });
    return this.userRepository.findOne({ where: { id } });
  }

  async getUser(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async deleteUser(id: number) {
    return await this.userRepository.destroy({ where: { id } })
  }
}
