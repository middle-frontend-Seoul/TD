import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/model/user.model';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.getUserWithPassword({ where: { username: loginDto.username } });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    if (!(await bcrypt.compare(loginDto.password, user.password))) {
      throw new BadRequestException('invalid credentials');
    }

    user.setDataValue('password', undefined);
    return user;
  }

  async registration(registerDto: RegisterDto) {
    if (registerDto.password !== registerDto.password_confirm) {
      throw new BadRequestException('Passwords do not match');
    }
    const hashed = await bcrypt.hash(registerDto.password, 12);

    const user = await this.userService.createUser({
      ...registerDto,
      password: hashed,
    });

    user.setDataValue('password', undefined);
    return user;
  }

  async userId(cookie: string): Promise<number> {
    const data = await this.jwtService.verifyAsync(cookie);

    return data.id;
  }

  async generateToken(user: User) {
    const payload = { id: user.id }
    return this.jwtService.signAsync(payload);
  }
}
