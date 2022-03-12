import { UploadController } from './controllers/upload-img.controller';
import { UploadImgService } from './services/upload-img.services';
import { Module } from '@nestjs/common';
// import { v2 as cloudinary } from 'cloudinary';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryProvider } from './provider/cloudinary.provider';

@Module({
  exports: [UploadImgService],
  controllers: [UploadController],
  imports: [ConfigModule],
  providers: [UploadImgService, CloudinaryProvider],
})
export class UploadImgModule {}
