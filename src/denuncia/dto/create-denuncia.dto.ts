import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDenunciaDto {
  @IsNotEmpty({ message: 'Informe o título da denúncia' })
  descricao: string;

  @IsOptional()
  localizacao?: string;

  @IsOptional()
  fotos?: string[];
}
