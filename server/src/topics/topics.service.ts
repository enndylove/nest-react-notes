import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TopicsService {
  constructor(private prisma: PrismaService) {}

  async createTopic(name: string, userId: string, parentId?: number) {
    return this.prisma.topic.create({
      data: {
        name,
        userId,
        parentId,
      },
    });
  }

  async getTopics(userId: string) {
    return this.prisma.topic.findMany({
      where: { userId },
      include: { children: true },
    });
  }

  async updateTopic(id: number, name: string, parentId?: number) {
    return this.prisma.topic.update({
      where: { id },
      data: { name, parentId },
    });
  }

  async deleteTopic(id: number) {
    return this.prisma.topic.delete({ where: { id } });
  }

  async updateConfidenceScore(id: number, confidenceScore: number) {
    return this.prisma.topic.update({
      where: { id },
      data: { confidenceScore },
    });
  }
}

