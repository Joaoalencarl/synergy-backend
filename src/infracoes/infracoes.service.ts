import { Injectable } from '@nestjs/common';
import { CreateInfracoeDto } from './dto/create-infracoe.dto';
import { UpdateInfracoeDto } from './dto/update-infracoe.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchInfracoesDto } from './dto/search-infracoes.dto';

@Injectable()
export class InfracoesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createInfracoeDto: CreateInfracoeDto, admin_id: string) {
    const data: Prisma.InfracaoCreateInput = {
      ...createInfracoeDto,
      admintrador: { connect: { id: admin_id } },
      usuario: { connect: { id: createInfracoeDto.usuario_id } },
    };

    await this.prisma.infracao.create({ data });

    return {
      success: true,
    };
  }

  async searchInfracoes(searchInfracoesDto: SearchInfracoesDto) {
    const {
      resultados_por_pagina = 20,
      pagina = 1,
      tipo_infracao,
      status,
      id_usuario,
      bairro,
      multa,
      prazo,
      ordem,
    } = searchInfracoesDto;
    const where: Prisma.InfracaoWhereInput = {};

    if (tipo_infracao) {
      where.tipo_da_infracao = { hasSome: tipo_infracao };
    }

    if (status) {
      where.status = { in: status };
    }

    if (id_usuario) {
      where.usuario_id = id_usuario;
    }

    if (bairro) {
      where.bairro = { contains: bairro };
    }

    if (multa !== undefined) {
      where.multa = multa ? { gt: 0 } : { equals: 0 };
    }

    if (prazo !== undefined) {
      where.prazo = prazo ? { not: null } : { equals: null };
    }

    const orderBy: Prisma.InfracaoOrderByWithRelationInput = {};
    if (ordem) {
      const [field, direction] = ordem.split(' ');
      orderBy[field] = direction;
    }

    const [total_resultados, items] = await this.prisma.$transaction([
      this.prisma.infracao.count({ where }),
      this.prisma.infracao.findMany({
        where,
        orderBy,
        skip: (pagina - 1) * resultados_por_pagina,
        take: resultados_por_pagina,
      }),
    ]);

    return {
      success: true,
      total_resultados,
      items,
    };
  }

  async updateInfracoe(updateInfracoeDto: UpdateInfracoeDto) {
    const data: Prisma.InfracaoUpdateInput = {};
    const updatedInfracao = await this.prisma.infracao.update({
      where: { id: updateInfracoeDto.id },
      data,
    });

    return {
      success: true,
      ...updatedInfracao,
    };
  }

  async deleteInfracoe(id_infracao: string) {
    await this.prisma.infracao.delete({ where: { id: id_infracao } });

    return { success: true };
  }
}
