import { Body, HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { CreateUserDto } from "../user/dto/create-user.dto";
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/model/user.model';

@Injectable()
export class AuthService {

  constructor(private userService: UserService,
              private jwtService: JwtService) {}

  async login(userDto: CreateUserDto) {
  }

  async registration(userDto: CreateUserDto) {
    // const candidate = await this.userService.getUserByYaId(userDto.ya_id);
    // if (candidate) {
    //   throw new HttpException('Пользователь уже зарегистрирован', HttpStatus.BAD_REQUEST);
    // }
    // const user = await this.userService.createUser({...userDto});
    // return this.generateToken(user);
  }

  async generateToken(user: User) {
    // const payload = {ya_id: user.ya_id, id: user.id, roles: user.roles}
    // return {
    //   token: this.jwtService.sign(payload)
    // }
  }
}
