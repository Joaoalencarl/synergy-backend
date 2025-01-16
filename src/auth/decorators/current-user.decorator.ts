import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { AuthRequest } from '../models/AuthRequest';
import { Admin } from 'src/admin/entities/admin.entity';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): Usuario | Admin => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
