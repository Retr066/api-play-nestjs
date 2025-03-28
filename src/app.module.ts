import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    CloudinaryModule,
    UploadsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      useFactory: () => {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
          throw new Error('MONGODB_URI is not defined in .env file');
        }
        return {
          uri,
        };
      },
    }),
    ProductsModule,
    CloudinaryModule,
    UploadsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
