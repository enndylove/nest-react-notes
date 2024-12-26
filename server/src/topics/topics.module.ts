import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [TopicsService, PrismaService],
  controllers: [TopicsController],
})
export class TopicsModule {}
