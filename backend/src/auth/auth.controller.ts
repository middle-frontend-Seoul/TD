import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

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
  @Get('user')
  async user(@Req() request: Request) {
    const cookie = request.cookies['forum-token'];
    try {
      const id = await this.authService.userId(cookie);

      return this.userService.getUser({ where: { id } });
    } catch {
      throw new UnauthorizedException();
    }
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
