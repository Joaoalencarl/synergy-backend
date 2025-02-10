import { Injectable } from '@nestjs/common';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateUniqueCustomId } from 'src/config/generate-custom-id.config';
import { Prisma } from '@prisma/client';

@Injectable()
export class EventoService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createEventoDto: CreateEventoDto, adminId: string) {
    if (!adminId) {
      return { error: 'AdminId precisa ser informado' };
    }
    const id = await generateUniqueCustomId(6, this.prisma, 'evento');
    if (
      (await this.prisma.admin.findUnique({ where: { id: adminId } })) === null
    ) {
      return { error: 'Somente Admins podem criar eventos' };
    }

    const data: Prisma.EventoCreateInput = {
      ...createEventoDto,
      id,
    };

    const createdEvento = await this.prisma.evento.create({ data });

    return {
      message: 'Evento criado com sucesso',
      success: true,
      ...createdEvento,
    };
  }

  async findEvent(search: string) {
    const eventos = await this.prisma.evento.findMany({
      where: {
        OR: [
          { nome: { contains: search } },
          { localizacao: { contains: search } },
          { data_de_inicio: { equals: new Date(search) } },
        ],
      },
    });

    if (eventos.length === 0) {
      return { message: 'Nenhum evento encontrado' };
    }

    return {
      message: 'Eventos encontrados com sucesso',
      success: true,
      eventos,
    };
  }

  async update(
    adminId: string,
    eventoId: string,
    updateEventoDto: UpdateEventoDto,
  ) {
    if (
      (await this.prisma.admin.findUnique({ where: { id: adminId } })) === null
    ) {
      return { error: 'Somente Admins podem atualizar eventos' };
    }

    const data: Prisma.EventoUpdateInput = {
      ...updateEventoDto,
    };

    const updatedEvento = this.prisma.evento.update({
      where: { id: eventoId },
      data,
    });

    return {
      message: 'Evento atualizado com sucesso',
      success: true,
      ...updatedEvento,
    };
  }

  async remove(id: string, eventoId: string) {
    if ((await this.prisma.admin.findUnique({ where: { id } })) === null) {
      return { error: 'Somente Admins podem deletar eventos' };
    }

    this.prisma.evento.delete({ where: { id: eventoId } });

    return { message: 'Evento deletado com sucesso', status: 'success' };
  }

  async subscribeEvent(eventoId: string, ambulanteId: string) {
    const id = await generateUniqueCustomId(
      6,
      this.prisma,
      'inscricoesDeEventos',
    );
    // Verifica se o evento existe
    const evento = await this.prisma.evento.findUnique({
      where: { id: eventoId },
    });
    if (!evento) {
      return { error: 'Evento não encontrado' };
    }
    // Verifica se o ambulante existe
    const ambulante = await this.prisma.ambulante.findUnique({
      where: { id: ambulanteId },
    });
    if (!ambulante) {
      return { error: 'Ambulante não encontrado' };
    }
    // Verifica se o ambulante já está inscrito no evento
    const inscricao = await this.prisma.inscricoesDeEventos.findFirst({
      where: {
        evento_id: eventoId,
        usuario_id: ambulanteId,
      },
    });
    if (inscricao) {
      return { error: 'Ambulante já inscrito no evento' };
    }

    const data: Prisma.InscricoesDeEventosCreateInput = {
      id,
      evento: { connect: { id: eventoId } },
      usuario: { connect: { id: ambulanteId } },
      status: 'PENDENTE',
    };

    const inscricaoCriada = await this.prisma.inscricoesDeEventos.create({
      data,
    });

    return {
      message: 'Inscrição realizada com sucesso',
      success: true,
      ...inscricaoCriada,
    };
  }
}
