import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize/types';
import { CreateForumDto } from './dto/create-forum.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { Forum } from './model/forum.model';
import { MessageLike } from './model/message-like';
import { Message } from './model/message.model';
import { Theme } from './model/theme.model';

@Injectable()
export class ForumService {
  constructor(
    @InjectModel(Forum) private forumRepository: typeof Forum,
    @InjectModel(Theme) private themeRepository: typeof Theme,
    @InjectModel(Message) private messageRepository: typeof Message,
    @InjectModel(MessageLike) private messageLikeRepository: typeof MessageLike,
  ) {}

  async createForum(dto: CreateForumDto) {
    const forum = await this.forumRepository.create(dto);
    return forum;
  }

  async getForum(options: FindOptions) {
    return this.forumRepository.findOne(options);
  }

  async getForums(page = 1, pageSize = 10) {
    const { rows: data, count } = await this.forumRepository.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      include: { all: true },
      distinct: true,
    });

    return {
      data,
      meta: {
        total: count,
        page,
        pageSize,
        lastPage: Math.ceil(count / pageSize),
      },
    };
  }

  async getAllForums() {
    const forums = await this.forumRepository.findAll({ include: { all: true } });
    return forums;
  }

  async deleteForum(id: number) {
    return await this.forumRepository.destroy({ where: { id } })
  }

  async createTheme(dto: CreateThemeDto) {
    const theme = await this.themeRepository.create(dto);
    return theme;
  }

  async updateTheme(id: number, dto: UpdateThemeDto) {
    await this.themeRepository.update(dto, { where: { id } });
    return this.themeRepository.findOne({ where: { id } });
  }

  async getTheme(options: FindOptions) {
    return this.themeRepository.findOne(options);
  }

  async getThemes(page = 1, pageSize = 10, options) {
    const { rows: data, count } = await this.themeRepository.findAndCountAll({
      ...options,
      limit: pageSize,
      offset: (page - 1) * pageSize,
      include: { all: true },
      distinct: true,
    });

    return {
      data,
      meta: {
        total: count,
        page,
        pageSize,
        lastPage: Math.ceil(count / pageSize),
      },
    };
  }

  async getAllThemes(options?: FindOptions) {
    const themes = await this.themeRepository.findAll({
      ...options,
      include: { all: true },
    });
    return themes;
  }

  async deleteTheme(id: number) {
    return await this.forumRepository.destroy({ where: { id } })
  }

  async createMessage(userId: number, dto: CreateMessageDto) {
    const message = await this.messageRepository.create({
      ...dto,
      userId,
    });
    return message;
  }

  async toggleMessageLike(userId: number, messageId: number) {
    const isMessageLiked = await this.messageLikeRepository.findOne({ where: {
      userId, messageId,
    } });
    if (isMessageLiked) {
      await this.messageLikeRepository.destroy({ where: {
        userId, messageId,
      } });
    } else {
      await this.messageLikeRepository.create({
        userId, messageId,
      });
    }
    return this.messageRepository.findOne({ where: { id: messageId }, include: { all: true } });
  }

  async updateMessage(id: number, dto: UpdateMessageDto) {
    await this.messageRepository.update(dto, { where: { id } });
    return this.messageRepository.findOne({ where: { id } });
  }

  async getMessage(options: FindOptions) {
    return this.messageRepository.findOne(options);
  }

  async getAllMessages(options?: FindOptions) {
    const messages = await this.messageRepository.findAll({
      ...options,
      include: { all: true },
    });
    return messages;
  }

  async getMessages(page = 1, pageSize = 10, options) {
    const { rows: data, count } = await this.messageRepository.findAndCountAll({
      ...options,
      limit: pageSize,
      offset: (page - 1) * pageSize,
      include: { all: true },
      distinct: true,
    });

    return {
      data,
      meta: {
        total: count,
        page,
        pageSize,
        lastPage: Math.ceil(count / pageSize),
      },
    };
  }

  async deleteMessage(id: number) {
    return await this.forumRepository.destroy({ where: { id } })
  }
}
