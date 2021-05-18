import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ForumController } from './forum.controller';
import { ForumService } from './forum.service';
import { Forum } from './model/forum.model';
import { Message } from './model/message.model';
import { Theme } from './model/theme.model';

@Module({
  controllers: [ForumController],
  providers: [ForumService],
  imports: [
    SequelizeModule.forFeature([Forum, Theme, Message]),
  ],
  exports: [ForumService]
})
export class ForumModule {}
