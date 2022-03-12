import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary';
import toStream = require('buffer-to-stream');
@Injectable()
export class UploadImgService {
  async uploadImageWithCloudinary(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    try {
      if (!file)
        throw new HttpException(
          'No files were uploaded',
          HttpStatus.BAD_REQUEST,
        );

      if (file.size > 1024 * 1024) {
        throw new HttpException('Size too large', HttpStatus.BAD_REQUEST);
      }

      if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
        throw new HttpException(
          'File format is incorrect',
          HttpStatus.BAD_REQUEST,
        );
      }

      return new Promise((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream((error, result) => {
          if (error) return reject(error);
          resolve(result);
        });

        toStream(file.buffer).pipe(upload);
      });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteImageInCloundinary(publicId: string): Promise<boolean> {
    try {
      const result = await cloudinary.api.delete_resources([publicId]);
      const isDeleted = result.deleted[publicId] === 'deleted';
      return isDeleted;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
