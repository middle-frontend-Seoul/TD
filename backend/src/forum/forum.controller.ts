import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateForumDto } from './dto/create-forum.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { ForumService } from './forum.service';

@Controller('forums')
export class ForumController {
  constructor(private forumService: ForumService) {}

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
    return this.forumService.getTheme(id);
  }

  @Get('themes')
  getAllThemes() {
    return this.forumService.getAllThemes()
  }

  @Delete('themes/:id')
  deleteTheme(@Param('id') id: number) {
    return this.forumService.deleteTheme(id);
  }

  /* MESSAGE */

  @Post('messages')
  createMessage(@Body() themeDto: CreateMessageDto) {
    return this.forumService.createMessage(themeDto)
  }

  @Put('messages/:id')
  updateMessage(@Param('id') id: number, @Body() themeDto: UpdateMessageDto) {
    return this.forumService.updateMessage(id, themeDto)
  }

  @Get('messages/:id')
  getMessage(@Param('id') id: number) {
    return this.forumService.getMessage(id);
  }

  @Get('messages')
  getAllMessages() {
    return this.forumService.getAllMessages()
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
    return this.forumService.getForum(id);
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
