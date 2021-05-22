import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const yaSession = await this.authService.getYaSession(request);

      if (!yaSession) {
        throw new UnauthorizedException();
      }

      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
