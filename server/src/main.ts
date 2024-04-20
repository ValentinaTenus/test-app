import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { SeedService } from 'prisma/seeds/seed.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const seedService = app.get(SeedService);

  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:3001', 'http://zb-test.com'],
    credentials: true,
    exposedHeaders: 'set-cookie',
  });

  await seedService.seedOpenDeals();

  await app.listen(process.env.PORT);
}
bootstrap();
