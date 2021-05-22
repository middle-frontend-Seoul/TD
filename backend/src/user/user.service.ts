import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { FindOptions } from 'sequelize/types';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
  ) {}

  async createUser(dto: UserCreateDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async updateUser(id: number, dto: UserUpdateDto) {
    await this.userRepository.update(dto, { where: { id } });
    return this.userRepository.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
  }

  async getUser(options: FindOptions) {
    return this.userRepository.findOne({
      ...options,
      attributes: { exclude: ['password'] },
    });
  }

  async getUserWithPassword(options: FindOptions) {
    return this.userRepository.findOne(options);
  }

  async getAllUsers(options?: FindOptions) {
    const users = await this.userRepository.findAll({
      ...options,
      attributes: { exclude: ['password'] },
    });
    return users;
  }

  async deleteUser(id: number) {
    return await this.userRepository.destroy({ where: { id } })
  }
}
