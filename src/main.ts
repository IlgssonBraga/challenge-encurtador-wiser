import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ModelNotFoundExceptionFilter } from './exeption-filters/model-not-found.exception-filter';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ModelNotFoundExceptionFilter());
  await app.listen(PORT);
}
bootstrap();
