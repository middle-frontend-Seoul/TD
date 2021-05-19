import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateForumDto } from './dto/create-forum.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { Forum } from './model/forum.model';
import { Message } from './model/message.model';
import { Theme } from './model/theme.model';

@Injectable()
export class ForumService {
  constructor(
    @InjectModel(Forum) private forumRepository: typeof Forum,
    @InjectModel(Theme) private themeRepository: typeof Theme,
    @InjectModel(Message) private messageRepository: typeof Message,
  ) {}

  async createForum(dto: CreateForumDto) {
    const forum = await this.forumRepository.create(dto);
    return forum;
  }

  async getForum(id: number) {
    return this.forumRepository.findOne({ where: { id }, include: { all: true }});
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

  async getTheme(id: number) {
    return this.themeRepository.findOne({ where: { id }, include: { all: true }});
  }

  async getAllThemes() {
    const themes = await this.themeRepository.findAll({ include: { all: true } });
    return themes;
  }

  async deleteTheme(id: number) {
    return await this.forumRepository.destroy({ where: { id } })
  }

  async createMessage(dto: CreateMessageDto) {
    const message = await this.messageRepository.create(dto);
    return message;
  }

  async updateMessage(id: number, dto: UpdateMessageDto) {
    await this.messageRepository.update(dto, { where: { id } });
    return this.messageRepository.findOne({ where: { id } });
  }

  async getMessage(id: number) {
    return this.messageRepository.findOne({ where: { id }, include: { all: true }});
  }

  async getAllMessages() {
    const messages = await this.messageRepository.findAll({ include: { all: true } });
    return messages;
  }

  async deleteMessage(id: number) {
    return await this.forumRepository.destroy({ where: { id } })
  }
}
