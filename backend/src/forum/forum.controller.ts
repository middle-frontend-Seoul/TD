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

  @Get('themes/paginated')
  getThemes(
    @Query('forumId') forumId: number,
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
  ) {
    return this.forumService.getThemes(Number(page), Number(pageSize), { where: { forumId } });
  }

  @Get('themes')
  getAllThemes(@Query('forumId') forumId: number) {
    return this.forumService.getAllThemes({ where: { forumId } })
  }

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

  @Delete('themes/:id')
  deleteTheme(@Param('id') id: number) {
    return this.forumService.deleteTheme(id);
  }

  /* MESSAGE */

  @Get('messages/paginated')
  getMessages(
    @Query('themeId') themeId: number,
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
  ) {
    return this.forumService.getMessages(Number(page), Number(pageSize), { where: { themeId } });
  }

  @Get('messages')
  getAllMessages(@Query('themeId') themeId: number) {
    return this.forumService.getAllMessages({ where: { themeId } })
  }

  @Post('messages')
  async createMessage(
    @Body() messageDto: CreateMessageDto,
    @Req() request: Request
  ) {
    const userId = await this.authService.userId(request);
    return this.forumService.createMessage(userId, messageDto)
  }

  @Put('messages/:id/toggle-like')
  async toggleMessageLike(@Param('id') id: number, @Req() request: Request) {
    const userId = await this.authService.userId(request);
    return this.forumService.toggleMessageLike(userId, id);
  }

  @Put('messages/:id')
  updateMessage(@Param('id') id: number, @Body() messageDto: UpdateMessageDto) {
    return this.forumService.updateMessage(id, messageDto)
  }

  @Get('messages/:id')
  getMessage(@Param('id') id: number) {
    return this.forumService.getMessage({ where: { id }, include: { all: true }});
  }

  @Delete('messages/:id')
  deleteMessage(@Param('id') id: number) {
    return this.forumService.deleteMessage(id);
  }

  /* FORUM */

  @Get('paginated')
  getForums(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
  ) {
    return this.forumService.getForums(Number(page), Number(pageSize));
  }

  @Get()
  getAllForums() {
    return this.forumService.getAllForums()
  }

  @Post()
  createForum(@Body() forumDto: CreateForumDto) {
    return this.forumService.createForum(forumDto)
  }

  @Get(':id')
  getForum(@Param('id') id: number) {
    return this.forumService.getForum({ where: { id }, include: { all: true }});
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.forumService.deleteForum(id);
  }
}
