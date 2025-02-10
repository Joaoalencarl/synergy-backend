import { Injectable } from '@nestjs/common';
import { CreateInfracoeDto } from './dto/create-infracoe.dto';
import { UpdateInfracoeDto } from './dto/update-infracoe.dto';
import { Prisma } from '@prisma/client';
import { generateUniqueCustomId } from 'src/config/generate-custom-id.config';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchInfracoesDto } from './dto/search-infracoes.dto';

@Injectable()
export class InfracoesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createInfracoeDto: CreateInfracoeDto, admin_id: string) {
    const infracao_id = await generateUniqueCustomId(
      6,
      this.prisma,
      'infracao',
    );
    const data: Prisma.InfracaoCreateInput = {
      ...createInfracoeDto,
      id: infracao_id,
      admintrador: { connect: { id: admin_id } },
      usuario: { connect: { id: createInfracoeDto.usuario_id } },
    };

    await this.prisma.infracao.create({ data });

    return {
      success: true,
      id_infracao: infracao_id,
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
    const {
      id_infracao,
      latitude,
      longitude,
      bairro,
      ponto_de_referencia,
      id_tipo_infracao,
      imagens,
      observacoes,
      id_tipo_providencia,
      multa,
      prazo,
      assinatura,
      status,
    } = updateInfracoeDto;

    const data: Prisma.InfracaoUpdateInput = {
      latitude: latitude ?? undefined,
      longitude: longitude ?? undefined,
      bairro: bairro ?? undefined,
      ponto_de_referencia: ponto_de_referencia ?? undefined,
      tipo_da_infracao: id_tipo_infracao ?? undefined,
      imagens: imagens ?? undefined,
      observacoes: observacoes ?? undefined,
      id_tipo_providencia: id_tipo_providencia ?? undefined,
      multa: multa === '' ? 0 : multa ? parseFloat(multa) : undefined,
      prazo: prazo === '' ? '0000-00-00' : (prazo ?? undefined),
      assinatura: assinatura ?? undefined,
      status: status ?? undefined,
    };

    const updatedInfracao = await this.prisma.infracao.update({
      where: { id: id_infracao },
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
