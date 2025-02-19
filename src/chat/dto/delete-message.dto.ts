import { IsNotEmpty, IsOptional } from 'class-validator';

export class DeleteMessageDto {
  @IsNotEmpty()
  message_id: string;
  @IsNotEmpty()
  admin_id: string;
  @IsOptional()
  deleted_at: Date;
}
