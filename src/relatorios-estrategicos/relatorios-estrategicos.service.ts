import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RelatoriosEstrategicosService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsuariosCadastrados(inicio?: Date, fim?: Date) {
    const total = await this.prisma.usuario.count({
      where: {
        createdAt: {
          gte: inicio,
          lte: fim,
        },
      },
    });

    return {
      success: true,
      total,
    };
  }

  async getAmbulantesCadastrados(inicio?: Date, fim?: Date) {
    const total = await this.prisma.ambulante.count({
      where: {
        createdAt: {
          gte: inicio,
          lte: fim,
        },
      },
    });

    return {
      success: true,
      total,
    };
  }

  async getAmbulantesAnalizadosConcessao(inicio?: Date, fim?: Date) {
    const total = await this.prisma.ambulante.count({
      where: {
        analyzedAt: {
          gte: inicio,
          lte: fim,
        },
      },
    });

    const aprovados = await this.prisma.ambulante.count({
      where: {
        analyzedAt: {
          gte: inicio,
          lte: fim,
        },
        status: 'APROVADO',
      },
    });

    const reprovados = await this.prisma.ambulante.count({
      where: {
        analyzedAt: {
          gte: inicio,
          lte: fim,
        },
        status: 'REPROVADO',
      },
    });

    return {
      success: true,
      total,
      resultados_por_status: {
        APROVADO: aprovados,
        REPROVADO: reprovados,
      },
    };
  }

  async getInfracoes(inicio?: Date, fim?: Date) {
    const whereClause = {
      createdAt: {
        gte: inicio,
        lte: fim,
      },
    };

    const infracoes = await this.prisma.infracao.findMany({
      where: inicio && fim ? whereClause : {},
      select: {
        Localizacao: {
          select: {
            bairro: true,
          },
        },
      },
    });

    const denuncias = await this.prisma.denuncias.findMany({
      where: inicio && fim ? whereClause : {},
      select: {
        localizacao: {
          select: {
            bairro: true,
          },
        },
      },
    });

    const resultadosPorBairro = {};

    infracoes.forEach((infracao) => {
      if (infracao.Localizacao && Array.isArray(infracao.Localizacao)) {
        infracao.Localizacao.forEach((localizacao) => {
          if (localizacao.bairro) {
            resultadosPorBairro[localizacao.bairro] =
              (resultadosPorBairro[localizacao.bairro] || 0) + 1;
          }
        });
      }
    });

    denuncias.forEach((denuncia) => {
      if (denuncia.localizacao && Array.isArray(denuncia.localizacao)) {
        denuncia.localizacao.forEach((localizacao) => {
          if (localizacao.bairro) {
            resultadosPorBairro[localizacao.bairro] =
              (resultadosPorBairro[localizacao.bairro] || 0) + 1;
          }
        });
      }
    });

    return {
      success: true,
      total: infracoes.length + denuncias.length,
      resultados_por_bairro: resultadosPorBairro,
    };
  }

  async getDenuncias(inicio?: Date, fim?: Date) {
    const whereClause = {
      createdAt: {
        gte: inicio,
        lte: fim,
      },
    };

    const denuncias = await this.prisma.denuncias.findMany({
      where: inicio && fim ? whereClause : {},
      select: {
        localizacao: {
          select: {
            bairro: true,
          },
        },
      },
    });

    const resultadosPorBairro = {};

    denuncias.forEach((denuncia) => {
      denuncia.localizacao.forEach((localizacao) => {
        if (localizacao.bairro) {
          resultadosPorBairro[localizacao.bairro] =
            (resultadosPorBairro[localizacao.bairro] || 0) + 1;
        }
      });
    });

    return {
      success: true,
      total: denuncias.length,
      resultados_por_bairro: resultadosPorBairro,
    };
  }
}
