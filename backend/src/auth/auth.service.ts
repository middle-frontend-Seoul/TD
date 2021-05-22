import { HttpService, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from '../user/user.service';
import { YaSession } from './model/ya-session.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private httpService: HttpService,
    @InjectModel(YaSession) private yaSessionRepository: typeof YaSession,
  ) {}
  async userId(request: Request): Promise<number> {
    const yaSession = await this.getYaSession(request);
    if (!yaSession) {
      throw new NotFoundException();
    }
    const user = await this.userService.getUser({ where: { id: yaSession.ya_id } });

    if (!user) {
      throw new NotFoundException();
    }

    return user.id;
  }

  async getYaSession(request: Request) {
    const allCookies = request.headers.cookie;
    const yaAuthCookie = request.cookies['authCookie'];

    if (!yaAuthCookie) {
      return;
    }
    const yaSession = await this.yaSessionRepository.findOne({ where: { ya_cookie: yaAuthCookie } });

    if (yaSession) {
      return yaSession;
    }

    if (!yaSession) {
      try {
        const { data } = await this.httpService
          .get('https://ya-praktikum.tech/api/v2/auth/user', {
            headers: {
              cookie: allCookies,
            },
          })
          .toPromise();
        if (!data) {
          throw new UnauthorizedException();
        }

        const user = await this.userService.getUser({ where: { id: data.id } });
        if (user) {
          await this.userService.updateUser(data.id, {
            login: data.login,
            email: data.email,
            avatar: data.avatar,
          });
        } else {
          await this.userService.createUser({
            id: data.id,
            login: data.login,
            email: data.email,
            avatar: data.avatar,
          });
        }

        return this.yaSessionRepository.create({
          ya_cookie: yaAuthCookie,
          ya_id: data.id,
          login: data.login,
          email: data.email,
          avatar: data.avatar,
        });
      } catch (e) {
        await this.yaSessionRepository.destroy({ where: { ya_cookie: yaAuthCookie } });
      }
    }
  }
}
