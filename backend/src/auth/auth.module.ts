import { forwardRef, HttpModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { YaSession } from './model/ya-session.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    forwardRef(() => UserModule),
    SequelizeModule.forFeature([YaSession]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    }),
    HttpModule,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
