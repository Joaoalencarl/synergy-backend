import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateInfracoeDto {
  @IsNotEmpty({ message: 'O campo usuario_id é obrigatório' })
  usuario_id: string;
  @IsNotEmpty({ message: 'O campo data é obrigatório' })
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

  @IsNotEmpty({ message: 'O campo data é obrigatório' })
  tipo_da_infracao: number[];
  @IsNotEmpty({ message: 'O campo data é obrigatório' })
  observacoes: string;
  @IsNotEmpty({ message: 'O campo data é obrigatório' })
  id_tipo_providencia: number[];
  @IsNotEmpty({ message: 'O campo data é obrigatório' })
  multa: number;
  @IsNotEmpty({ message: 'O campo data é obrigatório' })
  prazo: string;
  @IsNotEmpty({ message: 'O campo data é obrigatório' })
  assinatura: string;
  @IsNotEmpty({ message: 'O campo data é obrigatório' })
  status: number;
  @IsNotEmpty({ message: 'O campo data é obrigatório' })
  imagens: string[];
  @IsNotEmpty({ message: 'O campo data é obrigatório' })
  providencias: string;
  @IsNotEmpty({ message: 'O campo data é obrigatório' })
  assinatura_digitital: string;
}
