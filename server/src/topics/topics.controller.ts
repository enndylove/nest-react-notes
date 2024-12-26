import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// DTOs
import { CreateTopicDto } from './dto/createTopic.dto';
import { UpdateTopicDto, ParamUpdateTopicDto } from './dto/updateTopic.dto';
import { ParamDeleteTopicDto } from './dto/deleteTopic.dto';
import { UpdateConfidenceScoreDto, ParamUpdateConfidenceScoreDto } from './dto/updateConfidenceScore.dto';

@Controller('topics')
@UseGuards(JwtAuthGuard)
export class TopicsController {
  constructor(private topicsService: TopicsService) {}

  @Post()
  async createTopic(@Request() req, @Body() dto: CreateTopicDto) {
    return this.topicsService.createTopic(dto.name, req.user.userId, dto.parentId);
  }

  @Get()
  async getTopics(@Request() req) {
    return this.topicsService.getTopics(req.user.userId);
  }

  @Put(':id')
  async updateTopic(@Param('id') paramDto: ParamUpdateTopicDto, @Body() dto: UpdateTopicDto) {
    return this.topicsService.updateTopic(parseInt(paramDto.id), dto.name, dto.parentId);
  }

  @Delete(':id')
  async deleteTopic(@Param('id') paramDto: ParamDeleteTopicDto) {
    return this.topicsService.deleteTopic(parseInt(paramDto.id));
  }

  @Put(':id/confidence')
  async updateConfidenceScore(@Param('id') paramDto: ParamUpdateConfidenceScoreDto, @Body() dto: UpdateConfidenceScoreDto) {
    return this.topicsService.updateConfidenceScore(parseInt(paramDto.id), dto.confidenceScore);
  }
}

