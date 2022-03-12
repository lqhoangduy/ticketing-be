import { AllExceptionsFilter } from './exceptions/exception-filter';
import { ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, './secrets/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, './secrets/cert.pem')),
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('NFT Ticketing')
    .setDescription('API for NFT Ticketing ')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  const configService = app.select(ConfigModule).get(ConfigService);

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });
  // const { httpAdapter } = app.get(HttpAdapterHost);

  // app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(configService.get('port'));
}
bootstrap();
