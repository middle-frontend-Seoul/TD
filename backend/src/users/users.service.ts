import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
  ) {}

  async create(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.userRepository.update(dto, { where: { id }});
    return this.userRepository.findOne({ where: { id }});
  }

  async get(id: number) {
    return this.userRepository.findOne({ where: { id }});
  }

  async getAll() {
    const users = await this.userRepository.findAll({ include: {all: true} });
    return users;
  }
}
