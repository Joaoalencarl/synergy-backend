import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateMessagetDto } from './dto/create-message';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  sendMessage(@Body() createMessageDto: CreateMessagetDto) {
    return this.chatService.sendMessage(createMessageDto);
  }
}
