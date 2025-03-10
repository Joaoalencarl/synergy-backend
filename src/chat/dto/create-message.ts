import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMessagetDto {
  @IsNotEmpty()
  sender_id: string;

  @IsNotEmpty()
  text: string;

  @IsOptional()
  attachment: string;
}
