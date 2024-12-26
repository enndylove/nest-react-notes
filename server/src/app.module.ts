import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { TopicsModule } from './topics/topics.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [AuthModule, NotesModule, TopicsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}