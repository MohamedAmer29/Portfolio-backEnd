const { NestFactory } = require('@nestjs/core');
const { ExpressAdapter } = require('@nestjs/platform-express');
const { AppModule } = require('../dist/app.module');
const express = require('express');
const cookieParser = require('cookie-parser');

let cachedServer;

async function bootstrap() {
  if (!cachedServer) {
    const expressApp = express();
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );

    app.enableCors({
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      credentials: true,
    });

    expressApp.use(cookieParser());

    await app.init();
    cachedServer = expressApp;
  }
  return cachedServer;
}

module.exports = async (req, res) => {
  const app = await bootstrap();
  return app(req, res);
};
