import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { generateUniqueCustomId } from 'src/config/generate-custom-id.config';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessagetDto } from './dto/create-message';
import { MarkAsReadDto } from './dto/mark-as-read.dto';
import { DeleteMessageDto } from './dto/delete-message.dto';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async sendMessage(createMessageDto: CreateMessagetDto) {
    const message_id = await generateUniqueCustomId(12, this.prisma, 'message');
    const data: Prisma.MessageCreateInput = {
      id: message_id,
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
      id: message_id,
      mensage: messageData,
    };
  }

  async listMessages(last_message_id: string, limit: number) {
    // se não for passado o last_message_id, mostrar a partir do primeiro
    if (!last_message_id) {
      const messages = await this.prisma.message.findMany({
        take: limit,
        include: {
          admin: { select: { nome: true } },
          ReadFor: { select: { adminId: true } },
        },
      });
      return messages;
    }
    // se não for passado o limit, mostrar todas as mensagens
    else if (!limit) {
      const messages = await this.prisma.message.findMany({
        where: { id: { gt: last_message_id } },
        include: {
          admin: { select: { nome: true } },
          ReadFor: { select: { adminId: true } },
        },
      });
      return messages;
    }
    // se não for passado o last_message_id e o limit, mostrar a partir do primeiro
    else if (!last_message_id && !limit) {
      const messages = await this.prisma.message.findMany({
        include: {
          admin: { select: { nome: true } },
          ReadFor: { select: { adminId: true } },
        },
      });
      return messages;
    }
    // se for passado o last_message_id e o limit, mostrar a partir do last_message_id
    else if (last_message_id && limit) {
      const messages = await this.prisma.message.findMany({
        where: { id: { gt: last_message_id } },
        take: limit,
        include: {
          admin: { select: { nome: true } },
          ReadFor: { select: { adminId: true } },
        },
      });
      return messages;
    } else {
      return { success: false, message: 'Erro ao buscar mensagens' };
    }
  }

  async markAsRead(markAsReadDto: MarkAsReadDto) {
    const read_id = await generateUniqueCustomId(12, this.prisma, 'read');
    //validações de campos obrigatórios
    if (!markAsReadDto.message_id || !markAsReadDto.admin_id) {
      return {
        success: false,
        message: 'message_id e admin_id são obrigatórios',
      };
    } else if (
      !(await this.prisma.message.findFirst({
        where: { id: markAsReadDto.message_id },
      }))
    ) {
      return {
        success: false,
        message: 'Mensagem não encontrada',
      };
    } else if (
      !(await this.prisma.admin.findFirst({
        where: { id: markAsReadDto.admin_id },
      }))
    ) {
      return {
        success: false,
        message: 'Admin não encontrado',
      };
    }
    //se o campo read_at for preenchido, marcar todas as mensagens até a data como lidas
    if (markAsReadDto.read_at) {
      const messages = await this.prisma.message.findMany({
        where: { createdAt: { lte: markAsReadDto.read_at } },
      });

      const readForEntries = messages.map((message) => ({
        id: read_id,
        adminId: markAsReadDto.admin_id,
        messageId: message.id,
        readAt: new Date(),
      }));

      await this.prisma.readFor.createMany({
        data: readForEntries,
      });

      return {
        success: true,
        id: markAsReadDto.message_id,
        read_by: messages.map((m) => m.id),
      };
      //se o campo read_at não for preenchido, marcar a mensagem como lida
    } else {
      const readFor = await this.prisma.readFor.create({
        data: {
          id: read_id,
          adminId: markAsReadDto.admin_id,
          messageId: markAsReadDto.message_id,
        },
      });

      return {
        success: true,
        id: markAsReadDto.message_id,
        read_by: readFor.adminId,
      };
    }
  }

  async deleteMessage(deleteMessageDto: DeleteMessageDto) {
    //validações de campos obrigatórios
    if (!deleteMessageDto.admin_id) {
      return {
        success: false,
        message: 'id_usuario é obrigatório',
      };
    } else if (
      !(await this.prisma.admin.findFirst({
        where: { id: deleteMessageDto.admin_id },
      }))
    ) {
      return {
        success: false,
        message: 'Usuário não encontrado',
      };
    }
    //se o campo data_excluir for preenchido, excluir todas as mensagens até a data
    if (deleteMessageDto.deleted_at) {
      await this.prisma.message.deleteMany({
        where: { createdAt: { lte: deleteMessageDto.deleted_at } },
      });

      return {
        success: true,
      };
      //se o campo data_excluir não for preenchido, excluir a mensagem
    } else {
      await this.prisma.message.delete({
        where: {
          id: deleteMessageDto.message_id,
          adminId: deleteMessageDto.admin_id,
        },
      });

      return {
        success: true,
      };
    }
  }

  async getNotifications(admin_id: string) {
    //validações de campos obrigatórios
    if (!admin_id) {
      return {
        success: false,
        message: 'id_usuario é obrigatório',
      };
    } else if (
      !(await this.prisma.admin.findFirst({
        where: { id: admin_id },
      }))
    ) {
      return {
        success: false,
        message: 'Usuário não encontrado',
      };
    }
    //buscar mensagens não lidas
    const unreadMessages = await this.prisma.readFor.findMany({
      where: { adminId: admin_id },
      select: { messageId: true },
    });

    const lastMessage = await this.prisma.message.findFirst({
      where: { createdAt: { gt: new Date() } },
      include: { admin: { select: { nome: true } } },
    });

    return {
      success: true,
      nao_lidas: unreadMessages.length,
      ultima_mensagem: lastMessage,
    };
  }
}
