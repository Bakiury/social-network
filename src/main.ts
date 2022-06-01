import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ // For frontend to get credentials (cookie)
    origin: 'http://localhost:8080',
    credentials: true
  });

  const config = new DocumentBuilder()
    .setTitle('Social Network API')
    .setDescription('All Rest API endpoints made with NestJs and Prisma will be displayed here')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();