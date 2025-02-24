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
      success: true,
      ...ambulante,
    };
  }

  async buscarAmbulante(id: string) {
    const data = this.prisma.ambulante.findUnique({ where: { id } });
    if (!data) return 'Nenhum ambulante encontrado';
    else {
      return {
        message: 'Ambulante encontrado',
        success: true,
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
      success: true,
      updatedAmbulante,
    };
  }

  async remove(usuario_id: string) {
    // caso o ambulante exista, ele será removido
    const ambulante = await this.prisma.ambulante.findUnique({
      where: { id: usuario_id },
    });

    if (!ambulante) {
      return { message: 'Ambulante não encontrado', success: false };
    }

    await this.prisma.ambulante.delete({
      where: { id: usuario_id },
    });

    return {
      message: 'Ambulante removido com sucesso',
      success: true,
    };
  }
}
