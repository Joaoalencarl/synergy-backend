import { Injectable } from '@nestjs/common';
import { CreateDenunciaDto } from './dto/create-denuncia.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateUniqueCustomId } from 'src/config/generate-custom-id.config';
import { Prisma, StatusDeDenuncia } from '@prisma/client';

@Injectable()
export class DenunciaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDenunciaDto: CreateDenunciaDto, usuario_id: string) {
    const id = await generateUniqueCustomId(6, this.prisma, 'Denuncias');
    if (!usuario_id) {
      const data: Prisma.DenunciasCreateInput = {
        ...createDenunciaDto,
        id,
        //adicionar o usuário que fez a denúncia
        status: StatusDeDenuncia.RECEBIDA,
        codigo_de_busca: id,
      };

      const createdDenuncia = await this.prisma.denuncias.create({ data });

      return {
        mensagem: 'Denúncia criada com sucesso',
        success: true,
        ...createdDenuncia,
      };
    } else {
      const data: Prisma.DenunciasCreateInput = {
        ...createDenunciaDto,
        id,
        status: StatusDeDenuncia.RECEBIDA,
        usuario: { connect: { id: usuario_id } },
        codigo_de_busca: id,
      };

      const createdDenuncia = await this.prisma.denuncias.create({ data });

      return {
        mensagem: 'Denúncia criada com sucesso',
        success: true,
        ...createdDenuncia,
      };
    }
  }

  async findDenuncia(codigo_de_busca: string) {
    if (!codigo_de_busca) {
      const result = await this.prisma.denuncias.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return {
        mensagem: ' Denúncias encontradas com sucesso',
        success: true,
        result,
      };
    }
    const result = await this.prisma.denuncias.findFirst({
      where: { codigo_de_busca },
      orderBy: { createdAt: 'desc' },
    });

    return {
      mensagem: 'Denúncia encontrada com sucesso',
      success: true,
      result,
    };
  }

  async remove(id: string) {
    const denuncia_deletada = this.prisma.denuncias.delete({
      where: { id },
    });

    return {
      mensagem: 'Denúncia deletada com sucesso',
      success: true,
      ...denuncia_deletada,
    };
  }

  async addComentario(comentario: string, id: string, admin_id: string) {
    if (!comentario || !id || !admin_id) {
      return {
        mensagem: 'Informe o comentário, id da denúncia e id do fiscal',
      };
    }

    const comentario_id = await generateUniqueCustomId(
      6,
      this.prisma,
      'ComentarioDeDenuncias',
    );
    const data: Prisma.ComentarioDeDenunciasCreateInput = {
      id: comentario_id,
      descricao: comentario,
      denuncia: { connect: { id } },
      fiscal: { connect: { id: admin_id } },
    };

    const comentario_criado = await this.prisma.comentarioDeDenuncias.create({
      data,
    });

    return {
      mensagem: 'Comentário adicionado com sucesso',
      success: true,
      comentario_criado,
    };
  }
}
