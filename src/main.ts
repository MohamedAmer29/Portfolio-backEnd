import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ValidationGuard } from './common/guards/validation.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

async function createNestApp(server?: express.Express) {
  const app = server
    ? await NestFactory.create(AppModule, new ExpressAdapter(server))
    : await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:5173',
    credentials: true,
  });
  app.use(cookieParser());
  app.useGlobalGuards(new ValidationGuard());
  app.useGlobalFilters(new AllExceptionsFilter());

  const swaggerEnabled =
    String(process.env.SWAGGER_ENABLED ?? 'true') === 'true';
  if (swaggerEnabled) {
    const swaggerPath = process.env.SWAGGER_PATH ?? 'api/docs';
    const config = new DocumentBuilder()
      .setTitle('Developer Portfolio API')
      .setDescription('REST API for my developer portfolio')
      .setVersion('1.0')
      .addCookieAuth('access_token')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(swaggerPath, app, document);
  }

  await app.init();
  return app;
}

async function bootstrap() {
  const app = await createNestApp();
  await app.listen(process.env.PORT ?? 3000);
}

export default async function handler(req: unknown, res: unknown) {
  const server = express();
  const app = await createNestApp(server);
  return server(req as never, res as never);
}

if (require.main === module) {
  void bootstrap();
}
