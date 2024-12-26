import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('topics')
@UseGuards(JwtAuthGuard)
export class TopicsController {
  constructor(private topicsService: TopicsService) {}

  @Post()
  async createTopic(@Request() req, @Body() body: { name: string; parentId?: number }) {
    return this.topicsService.createTopic(body.name, req.user.userId, body.parentId);
  }

  @Get()
  async getTopics(@Request() req) {
    return this.topicsService.getTopics(req.user.userId);
  }

  @Put(':id')
  async updateTopic(@Param('id') id: string, @Body() body: { name: string; parentId?: number }) {
    return this.topicsService.updateTopic(parseInt(id), body.name, body.parentId);
  }

  @Delete(':id')
  async deleteTopic(@Param('id') id: string) {
    return this.topicsService.deleteTopic(parseInt(id));
  }

  @Put(':id/confidence')
  async updateConfidenceScore(@Param('id') id: string, @Body() body: { confidenceScore: number }) {
    return this.topicsService.updateConfidenceScore(parseInt(id), body.confidenceScore);
  }
}

