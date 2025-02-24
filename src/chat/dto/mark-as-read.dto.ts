import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class MarkAsReadDto {
  @IsNotEmpty()
  message_id: string;
  @IsNotEmpty()
  admin_id: string;
  @IsOptional()
  @IsDateString()
  read_at?: string;
}
