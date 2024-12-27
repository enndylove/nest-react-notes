import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
import { NotesService } from './notes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// DTOs
import { CreateNoteDto } from './dto/createNote.dto';
import { GetNotesDto } from './dto/getNotes.dto';
import { UpdateNoteDto, ParamUpdateNoteDto } from './dto/updateNote.dto';
import { DeleteNoteDto } from './dto/deleteNote.dto';
import { MoveNoteDto, ParamMoveNoteDto } from './dto/moveNote.dto';


@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post()
  async createNote(@Request() req, @Body() dto: CreateNoteDto) {
    return this.notesService.createNote(dto.title, dto.content, dto.topicId, req.user.userId);
  }

  @Get()
  async getNotes(@Request() req, @Query('topicId') dto: GetNotesDto) {
    return this.notesService.getNotes(req.user.userId, dto.topicId ? parseInt(dto.topicId) : undefined);
  }

  @Put()
  async updateNote(@Query('id') id: string, @Body() dto: UpdateNoteDto) {
    return this.notesService.updateNote(parseInt(id), dto.title, dto.content);
  }

  @Delete()
  async deleteNote(@Query('id') id: string) {
    return this.notesService.deleteNote(parseInt(id));
  }

  @Put('move')
  async moveNote(@Query('id') id: string, @Body() dto: MoveNoteDto) {
    return this.notesService.moveNote(parseInt(id), dto.newTopicId);
  }
}

