import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          field: error.property,
          messages: Object.values(error.constraints),
        }));
        return new BadRequestException({
          data: null,
          message: 'Error de validación',
          errors: result,
          status: 'error',
        });
      },
      stopAtFirstError: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
