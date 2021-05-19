import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/model/user.model';
import { AuthModule } from './auth/auth.module';
import { ForumModule } from './forum/forum.module';
import { Forum } from './forum/model/forum.model';
import { Theme } from './forum/model/theme.model';
import { Message } from './forum/model/message.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Forum, Theme, Message],
      autoLoadModels: true,
      // sync: { force: true }, // TODO - настроить миграции. эта опция удаляет и пересоздает все таблицы из моделей.
    }),
    AuthModule,
    UserModule,
    ForumModule,
  ],
})

export class AppModule {}
