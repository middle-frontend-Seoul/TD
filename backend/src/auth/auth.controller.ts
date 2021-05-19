import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.login(loginDto)
    const token = await this.authService.generateToken(user);

    response.cookie('forum-token', token, {
      httpOnly: true,
      // secure: true,
      // sameSite: 'none',
    });
    return user;
  }

  @Post('registration')
  async registration(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.registration(registerDto);
    const token = await this.authService.generateToken(user);

    response.cookie('forum-token', token, {
      httpOnly: true,
      // secure: true,
      // sameSite: 'none',
    });
    return user;
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('forum-token');

    return {
      message: 'Success',
    };
  }
}
