import { IsNotEmpty } from 'class-validator';

export class CreateInfracoeDto {
  @IsNotEmpty({ message: 'O campo usuario_id é obrigatório' })
  usuario_id: string;
  @IsNotEmpty({ message: 'O campo data é obrigatório' })
  descricao: string;
  @IsNotEmpty({ message: 'O campo data é obrigatório' })
  latitude: number;
  @IsNotEmpty({ message: 'O campo data é obrigatório' })
  longitude: number;
  @IsNotEmpty({ message: 'O campo data é obrigatório' })
  bairro: string;
  @IsNotEmpty({ message: 'O campo data é obrigatório' })
  ponto_de_referencia: string;
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
