import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  app.use(morgan('tiny'));

  await app
    .listen(process.env.PORT || 5000)
    .then(() => logger.log(`Listening on: localhost:${process.env.PORT}`))
    .catch((err) => {
      logger.error('>>> App error: ', err);
    });
}
bootstrap();
