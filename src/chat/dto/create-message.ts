import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMessagetDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  text: string;

  @IsOptional()
  attachment: string;
}
