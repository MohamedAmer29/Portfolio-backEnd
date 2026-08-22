import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  ValidationError,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

const ROUTE_ARGS_METADATA = '__routeArguments__';
const BODY_PARAMTYPE = 3;

@Injectable()
export class ValidationGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() !== 'http') {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const handler = context.getHandler();
    const controller = context.getClass();

    const paramtypes: unknown[] =
      Reflect.getMetadata('design:paramtypes', handler) ?? [];
    const routeArgs: Record<string, { index: number; data: unknown }> =
      Reflect.getMetadata(
        ROUTE_ARGS_METADATA,
        controller.prototype,
        handler.name,
      ) ?? {};

    for (const key of Object.keys(routeArgs)) {
      const [paramtype] = key.split(':');
      if (Number(paramtype) !== BODY_PARAMTYPE) {
        continue;
      }

      const { index, data } = routeArgs[key];
      const metatype = paramtypes[index] as
        (new (...args: unknown[]) => unknown) | undefined;

      if (!metatype || this.isPrimitive(metatype)) {
        continue;
      }

      const raw = data ? (request.body ?? {})[data as string] : request.body;
      if (raw === undefined) {
        continue;
      }

      const instance = plainToInstance(metatype as new () => object, raw);
      const errors = await validate(instance, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });

      if (errors.length > 0) {
        throw new BadRequestException(this.formatErrors(errors));
      }

      if (data) {
        request.body = { ...request.body, [data as string]: instance };
      } else {
        request.body = instance;
      }
    }

    return true;
  }

  private isPrimitive(metatype: unknown): boolean {
    return [String, Boolean, Number, Array, Object].includes(metatype as never);
  }

  private formatErrors(errors: ValidationError[]) {
    return errors.map((error) => ({
      property: error.property,
      constraints: error.constraints,
      children: error.children?.length
        ? this.formatErrors(error.children)
        : undefined,
    }));
  }
}
