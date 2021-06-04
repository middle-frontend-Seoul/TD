import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { FindOptions } from 'sequelize/types';
import {UpdateMessageDto} from "../forum/dto/update-message.dto";

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
    });
  }

  async getUser(options: FindOptions) {
    return this.userRepository.findOne(options);
  }

  async getUserWithPassword(options: FindOptions) {
    return this.userRepository.findOne(options);
  }

  async getAllUsers(options?: FindOptions) {
    const users = await this.userRepository.findAll(options);
    return users;
  }

  async deleteUser(id: number) {
    return await this.userRepository.destroy({ where: { id } })
  }

  async updateTheme(id: number, dto: UserUpdateDto) {
    try {
      await this.userRepository.update(dto, { where: { id } });
      return this.userRepository.findOne({ where: { id } });
    }
    catch {
      throw new BadRequestException()
    }
  }
}
