import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessagetDto } from './dto/create-message';
import { MarkAsReadDto } from './dto/mark-as-read.dto';
import { DeleteMessageDto } from './dto/delete-message.dto';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async sendMessage(createMessageDto: CreateMessagetDto) {
    const data: Prisma.MessageCreateInput = {
      text: createMessageDto.text,
      attachment: createMessageDto.attachment,
      chat: { connect: { id: 'MAINCHAT' } },
      admin: { connect: { id: createMessageDto.sender_id } },
    };
    const messageData = await this.prisma.message.create({
      data,
      include: { admin: { select: { nome: true } } },
    });

    return {
      success: true,
      mensage: messageData,
    };
  }

  async listMessages(last_message_id: string, limit: number) {
    const messages = await this.prisma.message.findMany({
      // se não for passado o last_message_id, mostrar a partir do primeiro
      where: last_message_id ? { id: { gt: last_message_id } } : {},
      // se não for passado o limit, mostrar 20 mensagens
      take: limit || 20,
      include: { admin: true, ReadFor: true },
    });

    return {
      success: true,
      mensagens: messages.map((message) => ({
        id_mensagem: message.id,
        id_remetente: message.admin.id,
        nome_remetente: message.admin.nome,
        imagem_remetente: message.admin.foto_url,
        mensagem: message.text,
        data_envio: message.createdAt,
        lido_por: message.ReadFor.map((read) => read.adminId),
      })),
    };
  }

  async markAsRead(markAsReadDto: MarkAsReadDto) {
    // caso o campo data_leitura seja preenchido, marcar todas as mensagens até a data como lidas
    if (markAsReadDto.read_at) {
      const messages = await this.prisma.message.findMany({
        where: { createdAt: { lte: new Date(markAsReadDto.read_at) } },
      });

      for (const message of messages) {
        await this.prisma.readFor.create({
          data: {
            admin: { connect: { id: markAsReadDto.admin_id } },
            message: { connect: { id: message.id } },
            createdAt: new Date(),
          },
        });
      }
    } else {
      // caso o campo data_leitura não seja preenchido, marcar a mensagem como lida
      await this.prisma.readFor.create({
        data: {
          message: { connect: { id: markAsReadDto.message_id } },
          admin: { connect: { id: markAsReadDto.admin_id } },
          createdAt: new Date(),
        },
      });
    }

    return {
      //retornar a ultima mensagem lida e quem leu
      success: true,
      id_mensagem: markAsReadDto.message_id,
      lido_por: [markAsReadDto.admin_id],
    };
  }

  async deleteMessage(deleteMessageDto: DeleteMessageDto) {
    const autor = await this.prisma.admin.findUnique({
      where: { id: deleteMessageDto.admin_id },
      include: { Message: true },
    });

    // verificar se o usuário é o autor da mensagem
    if (
      autor &&
      autor.Message.find(
        (message) => message.id === deleteMessageDto.message_id,
      )
    ) {
      // caso o campo data_excluir seja preenchido, apagar todas as mensagens até a data
      if (deleteMessageDto.deleted_at) {
        await this.prisma.message.deleteMany({
          where: {
            createdAt: { lte: new Date(deleteMessageDto.deleted_at) },
          },
        });
        return { success: true };
      } else {
        // caso o campo data_excluir não seja preenchido, apagar a mensagem
        await this.prisma.message.delete({
          where: { id: deleteMessageDto.message_id },
        });
        return { success: true };
      }
    }
    return { success: false };
  }

  async getNotifications(admin_id: string) {
    const messages = await this.prisma.message.findMany({
      where: {
        NOT: {
          ReadFor: { some: { adminId: admin_id } },
        },
      },
      include: { admin: true },
    });
    return {
      success: true,
      nao_lidas: messages.length,
      ultima_mensagem: messages[messages.length - 1]
        ? {
            id_mensagem: messages[messages.length - 1].id,
            nome_remetente: messages[messages.length - 1].admin.nome,
            mensagem: messages[messages.length - 1].text,
            data_envio: messages[messages.length - 1].createdAt,
          }
        : null,
    };
  }
}
