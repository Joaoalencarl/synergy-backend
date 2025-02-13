import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';
import { ADMIN_TYPES_KEY } from '../decorator/admin-type.decorator';

@Injectable()
export class AdminTypeGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredAdminTypes = this.reflector.getAllAndOverride<string[]>(
      ADMIN_TYPES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredAdminTypes) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user.id; // Supondo que o ID do usuário está no objeto user da requisição
    const adminId = request.params.id; // Supondo que o ID do admin está nos parâmetros da rota

    if (userId !== adminId) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar esta página',
      );
    }

    const admin = await this.prisma.admin.findUnique({
      where: { id: adminId },
    });

    if (!admin) {
      throw new ForbiddenException('Admin não encontrado');
    }

    if (!requiredAdminTypes.includes(admin.adminType)) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar esta página',
      );
    }

    return true;
  }
}
