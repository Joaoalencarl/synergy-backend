import { Injectable } from '@nestjs/common';
import { CreateAmbulanteDto } from './dto/create-ambulante.dto';
import { UpdateAmbulanteDto } from './dto/update-ambulante.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { UserMiddleware } from 'src/usuario/middleware/user.middleware';
import { generateUniqueCustomId } from 'src/config/generate-custom-id.config';

@Injectable()
export class AmbulanteService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userMiddleware: UserMiddleware,
  ) {}
  async create(createAmbulanteDto: CreateAmbulanteDto, usuario_id: string) {
    await this.userMiddleware.userExists(usuario_id);
    const id = await generateUniqueCustomId(6, this.prisma, 'ambulante');
    const data: Prisma.AmbulanteCreateInput = {
      ...createAmbulanteDto,
      id,
      status: 'PENDENTE',
      usuario: {
        connect: {
          id: usuario_id,
        },
      },
    };

    const ambulante = this.prisma.ambulante.create({ data });

    return {
      message: 'Ambulante criado com sucesso, aguarde a verificação',
      status: 'success',
      ...ambulante,
    };
  }

  async buscarAmbulante(id: string) {
    const data = this.prisma.ambulante.findUnique({ where: { id } });
    if (!data) return 'Nenhum ambulante encontrado';
    else {
      return {
        message: 'Ambulante encontrado',
        status: 'success',
        ...data,
      };
    }
  }

  async update(id: string, updateAmbulanteDto: UpdateAmbulanteDto) {
    const data: Prisma.AmbulanteUpdateInput = {
      ...updateAmbulanteDto,
    };

    const updatedAmbulante = this.prisma.ambulante.update({
      where: { id },
      data,
    });

    return {
      message: 'Ambulante atualizado com sucesso',
      status: 'success',
      updatedAmbulante,
    };
  }

  async remove(id: string, usuario_id: string) {
    await this.userMiddleware.userExists(usuario_id);
    const data = this.prisma.ambulante.delete({ where: { id } });
    if (!data) return 'Nenhum ambulante encontrado';
    else {
      return {
        message: 'Ambulante deletado com sucesso',
        status: 'success',
        data,
      };
    }
  }
}
