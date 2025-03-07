import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDenunciaDto {
  @IsNotEmpty({ message: 'Informe o título da denúncia' })
  descricao: string;

  @IsOptional()
  localizacao?: {
    latitude?: number;
    longitude?: number;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
    cep?: string;
  };

  @IsOptional()
  fotos?: string[];
}
