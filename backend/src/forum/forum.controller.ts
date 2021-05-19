import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { CreateForumDto } from './dto/create-forum.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { ForumService } from './forum.service';

@UseGuards(AuthGuard)
@Controller('forums')
export class ForumController {
  constructor(
    private forumService: ForumService,
    private authService: AuthService,
  ) {}

  /* THEME */

  @Post('themes')
  createTheme(@Body() themeDto: CreateThemeDto) {
    return this.forumService.createTheme(themeDto)
  }

  @Put('themes/:id')
  updateTheme(@Param('id') id: number, @Body() themeDto: UpdateThemeDto) {
    return this.forumService.updateTheme(id, themeDto)
  }

  @Get('themes/:id')
  getTheme(@Param('id') id: number) {
    return this.forumService.getTheme({ where: { id }, include: { all: true }});
  }

  @Get('themes')
  getAllThemes(@Query('forumId') forumId: number) {
    return this.forumService.getAllThemes({ where: { forumId } })
  }

  @Delete('themes/:id')
  deleteTheme(@Param('id') id: number) {
    return this.forumService.deleteTheme(id);
  }

  /* MESSAGE */

  @Post('messages')
  async createMessage(
    @Body() messageDto: CreateMessageDto,
    @Req() request: Request
  ) {
    const cookie = request.cookies['forum-token'];
    const userId = await this.authService.userId(cookie);
    return this.forumService.createMessage(userId, messageDto)
  }

  @Put('messages/:id')
  updateMessage(@Param('id') id: number, @Body() messageDto: UpdateMessageDto) {
    return this.forumService.updateMessage(id, messageDto)
  }

  @Get('messages/:id')
  getMessage(@Param('id') id: number) {
    return this.forumService.getMessage({ where: { id }, include: { all: true }});
  }

  @Get('messages')
  getAllMessages(@Query('themeId') themeId: number) {
    return this.forumService.getAllMessages({ where: { themeId } })
  }

  @Delete('messages/:id')
  deleteMessage(@Param('id') id: number) {
    return this.forumService.deleteMessage(id);
  }

  /* FORUM */

  @Post()
  createForum(@Body() forumDto: CreateForumDto) {
    return this.forumService.createForum(forumDto)
  }

  @Get(':id')
  getForum(@Param('id') id: number) {
    return this.forumService.getForum({ where: { id }, include: { all: true }});
  }

  @Get()
  getAllForums() {
    return this.forumService.getAllForums()
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.forumService.deleteForum(id);
  }
}
