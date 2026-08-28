import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

@Injectable()
export class AnyFileInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const http = context.switchToHttp();
    const req = http.getRequest<Request>();
    const res = http.getResponse<Response>();

    return new Promise<void>((resolve, reject) => {
      (upload.any() as CallableFunction)(req, res, (err: unknown) => {
        if (err) {
          return reject(err);
        }
        const files = (req as unknown as { files?: any[] }).files;
        if (files && files.length > 0) {
          (req as unknown as { file?: any }).file = files[0];
        }
        resolve();
      });
    }).then(() => next.handle());
  }
}
