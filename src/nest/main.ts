import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import type { OpenAPIObject } from '@nestjs/swagger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { Handler } from 'aws-lambda';
import type { INestApplication } from '@nestjs/common';

export async function init_app(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule, new ExpressAdapter());

  return app;
}

// Plugins
function use_swagger(route: string, app: INestApplication) {
  const config = new DocumentBuilder()
    .setContact(
      'Murilo Gonçalves',
      'https://www.github.com/MuriloGon',
      'murilogoncalvesdev@gmail.com',
    )
    .setTitle('Serverless + Ts + Nest Api')
    .setDescription('Api using aws lambda + nestjs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(route, app, document);
}

// Boostraps
export async function bootstrap_serverless(): Promise<Handler> {
  const app = await init_app();
  await app.init();
  const express_app = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: express_app });
}

export async function open_api_doc(stage: string): Promise<OpenAPIObject> {
  const app = await init_app();
  const config = new DocumentBuilder()
    .setContact(
      'Murilo Gonçalves',
      'https://www.github.com/MuriloGon',
      'murilogoncalvesdev@gmail.com',
    )
    .addServer('/' + stage + '/api')
    .addApiKey({ type: 'apiKey', name: 'x-api-key' }, 'x-api-key')
    .addBearerAuth()
    .setTitle('Serverless + Ts + Nest Api')
    .setDescription('Api using aws lambda + nestjs')
    .setVersion('1.0')
    .build();

  return SwaggerModule.createDocument(app, config);
}

export async function bootstrap_standalone(): Promise<void> {
  const API_DEFAULT_PORT = 3000;
  const app = await init_app();
  use_swagger('docs', app);
  await app.listen((process.env.API_PORT as string) || API_DEFAULT_PORT);
}

// Run Standalon Nest when NEST_MODE=standalone
if (process.env.NEST_MODE === 'standalone') {
  bootstrap_standalone().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
