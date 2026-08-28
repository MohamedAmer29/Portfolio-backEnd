import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

export interface ImageFile {
  buffer: Buffer;
  mimetype: string;
  originalname: string;
  size?: number;
}

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
}

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject('CLOUDINARY') private readonly client: typeof cloudinary,
  ) {}

  async uploadImage(
    file: ImageFile,
    folder = 'portfolio/about-me',
  ): Promise<CloudinaryUploadResult> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }
    if (!file.mimetype?.startsWith('image/')) {
      throw new BadRequestException('Only image files are allowed');
    }

    return new Promise<CloudinaryUploadResult>((resolve, reject) => {
      const uploadStream = this.client.uploader.upload_stream(
        { folder, resource_type: 'image' },
        (error, result) => {
          if (error || !result) {
            return reject(error ?? new Error('Cloudinary upload failed'));
          }
          resolve({ url: result.secure_url, publicId: result.public_id });
        },
      );
      uploadStream.end(file.buffer);
    });
  }
}
