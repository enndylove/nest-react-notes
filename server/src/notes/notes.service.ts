import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async createNote(title: string, content: string, topicId: number, userId: string) {
    return this.prisma.note.create({
      data: {
        title,
        content,
        topicId,
        userId,
      },
    });
  }

  async getNotes(userId: string, topicId?: number) {
    return this.prisma.note.findMany({
      where: {
        userId,
        ...(topicId && { topicId }),
      },
    });
  }

  async updateNote(id: number, title: string, content: string) {
    return this.prisma.note.update({
      where: { id },
      data: { title, content },
    });
  }

  async deleteNote(id: number) {
    return this.prisma.note.delete({ where: { id } });
  }

  async moveNote(id: number, newTopicId: number) {
    return this.prisma.note.update({
      where: { id },
      data: { topicId: newTopicId },
    });
  }
}

