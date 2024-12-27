import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CLIENT_CORS } from './constans/cors.constans';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors(CLIENT_CORS);
  
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
