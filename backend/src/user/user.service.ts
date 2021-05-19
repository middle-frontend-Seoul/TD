import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindOptions } from 'sequelize/types';

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

  async getAllUsers() {
    const users = await this.userRepository.findAll({
      attributes: { exclude: ['password'] },
    });
    return users;
  }

  async deleteUser(id: number) {
    return await this.userRepository.destroy({ where: { id } })
  }
}
