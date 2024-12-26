import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
import { NotesService } from './notes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post()
  async createNote(@Request() req, @Body() body: { title: string; content: string; topicId: number }) {
    return this.notesService.createNote(body.title, body.content, body.topicId, req.user.userId);
  }

  @Get()
  async getNotes(@Request() req, @Query('topicId') topicId?: string) {
    return this.notesService.getNotes(req.user.userId, topicId ? parseInt(topicId) : undefined);
  }

  @Put(':id')
  async updateNote(@Param('id') id: string, @Body() body: { title: string; content: string }) {
    return this.notesService.updateNote(parseInt(id), body.title, body.content);
  }

  @Delete(':id')
  async deleteNote(@Param('id') id: string) {
    return this.notesService.deleteNote(parseInt(id));
  }

  @Put(':id/move')
  async moveNote(@Param('id') id: string, @Body() body: { newTopicId: number }) {
    return this.notesService.moveNote(parseInt(id), body.newTopicId);
  }
}

