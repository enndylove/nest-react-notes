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

  @Put(':id')
  async updateNote(@Param('id') paramDto: ParamUpdateNoteDto, @Body() dto: UpdateNoteDto) {
    return this.notesService.updateNote(parseInt(paramDto.id), dto.title, dto.content);
  }

  @Delete(':id')
  async deleteNote(@Param('id') paramDto: DeleteNoteDto) {
    return this.notesService.deleteNote(parseInt(paramDto.id));
  }

  @Put(':id/move')
  async moveNote(@Param('id') paramDto: ParamMoveNoteDto, @Body() dto: MoveNoteDto) {
    return this.notesService.moveNote(parseInt(paramDto.id), dto.newTopicId);
  }
}

