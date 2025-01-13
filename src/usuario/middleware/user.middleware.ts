import { HttpException, Injectable } from '@nestjs/common';
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
        throw new HttpException('E-mail já cadastrado', 400);
      }
      if (user.cpf === data.cpf) {
        throw new HttpException('CPF já cadastrado', 400);
      }
    }
  }
}
