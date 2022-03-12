import { UploadImgService } from './../services/upload-img.services';
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Delete,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('image')
@ApiTags('image')
export class UploadController {
  constructor(private readonly uploadImageServivce: UploadImgService) {}

  @Post('')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const result: any =
      await this.uploadImageServivce.uploadImageWithCloudinary(file);
    return { url: result.url, publicId: result['public_id'] };
  }

  @Delete('/:publicId')
  async deleteImage(@Param('publicId') publicId: string) {
    const result = await this.uploadImageServivce.deleteImageInCloundinary(
      publicId,
    );
    return { isDeleted: result };
  }
}
