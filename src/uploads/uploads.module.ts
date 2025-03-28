import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  controllers: [UploadsController],
})
export class UploadsModule {}
