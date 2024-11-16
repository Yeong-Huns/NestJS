import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Dto 에 정의되지 않은 값은 무시한다.
    forbidNonWhitelisted: true // Dto 에 정의되지 않은 값이 들어오면 에러를 발생시킨다.
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
