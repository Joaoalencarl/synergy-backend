import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { generateUniqueCustomId } from 'src/config/generate-custom-id.config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async sendMessage(createMessageDto) {
    const message_id = generateUniqueCustomId(12, this.prisma, 'message')
  }
}
