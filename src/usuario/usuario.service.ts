import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(criarUsuarioDto: CriarUsuarioDto): Promise<Usuario> {
    const data: Prisma.UsuarioCreateInput = {
      ...criarUsuarioDto,
      senha: await bcrypt.hash(criarUsuarioDto.senha, 10),
    };

    const createdUser = await this.prisma.usuario.create({ data });

    return {
      ...createdUser,
      senha: undefined,
    };
  }

  findByEmail(email: string) {
    return this.prisma.usuario.findUnique({ where: { email } });
  }
}
