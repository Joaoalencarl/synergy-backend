import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateMessagetDto } from './dto/create-message';
import { MarkAsReadDto } from './dto/mark-as-read.dto';
import { DeleteMessageDto } from './dto/delete-message.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('send-message')
  sendMessage(@Body() createMessageDto: CreateMessagetDto) {
    return this.chatService.sendMessage(createMessageDto);
  }
  /* 
curl --location '{{host}}/chat/send-message' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{BarrerToken}}\
--data '{
  "sender_id": "",
  "text": ""
  "attachment": ""
}'
  */

  @Get('list-messages')
  listMessages(
    @Query('last_message_id') last_message_id: string, // optional
    @Query('limit') limit: number, // optional
  ) {
    return this.chatService.listMessages(last_message_id, limit);
  }
  /*
curl --location '{{host}}/chat/list-messages?last_message_id=&limit=' \
--header ' Content-Type: application/json' \
--header ' Authorization Bearer {{BearerToken}}'
  */

  @Post('mark-as-read')
  markAsRead(@Body() markAsReadDto: MarkAsReadDto) {
    return this.chatService.markAsRead(markAsReadDto);
  }
  /*
curl --location '{{host}}/chat/mark-as-read' \
--header 'Content-Type: application/json' \
--header ' Authorization Bearer {{BearerToken}}' \
--data '{
  "message_id": "",
  "admin_id": "",
  "read_at": ""
}'
  */

  @Delete('delete-message')
  deleteMessage(@Body() deleteMessageDto: DeleteMessageDto) {
    return this.chatService.deleteMessage(deleteMessageDto);
  }
  /*
curl --location '{{host}}/chat/delete-message' \
--header 'Content-Type: application/json' \
--header ' Authorization Bearer {{BearerToken}}' \
--data '{
  "message_id": "",
  "admin_id": "",
  "deleted_at": ""
}'
  */

  @Get('notifications')
  getNotifications(@Query('admin_id') admin_id: string) {
    return this.chatService.getNotifications(admin_id);
  }
  /*
curl --location '{{host}}/chat/notifications?admin_id=' \
--header 'Content-Type: application/json' \
--header ' Authorization Bearer {{BearerToken}}'
  */
}
