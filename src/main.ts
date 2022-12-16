import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;

  // Swagger setup
  const options = new DocumentBuilder()
    .setTitle('Code Challenge')
    .setDescription('A simple tech exercise for Trayector.')
    .setVersion('0.0.1')
    // .addTag('Endpoints')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port, () =>
    console.log(`CodeChallengeApp is running on PORT ${port}`),
  );
}
bootstrap();
