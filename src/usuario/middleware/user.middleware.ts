import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async validateUser(data: Prisma.UsuarioCreateInput) {
    const user = await this.prisma.usuario.findFirst({
      where: { OR: [{ email: data.email }, { cpf: data.cpf }] },
    });

    if (user) {
      if (user.email === data.email) {
        throw new UnauthorizedException('E-mail já cadastrado');
      }
      if (user.cpf === data.cpf) {
        throw new UnauthorizedException('CPF já cadastrado');
      }
    }
  }
  async userExists(id: string) {
    const user = await this.prisma.usuario.findUnique({
      where: { id },
    });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }
  }
}
