import { IsString, IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAmbulanteDto {
  @IsString({ message: 'A descrição deve ser uma string' })
  @IsNotEmpty({ message: 'A descrição não pode ser vazia' })
  descricao: string;

  @IsString({ message: 'O nome do negócio deve ser uma string' })
  @IsNotEmpty({ message: 'O nome do negócio não pode ser vazio' })
  nome_do_negoocio: string;

  @IsString({ message: 'O tipo do negócio deve ser uma string' })
  @IsNotEmpty({ message: 'O tipo do negócio não pode ser vazio' })
  tipo_do_negocio: string;

  @IsString({ message: 'A descrição do negócio deve ser uma string' })
  @IsNotEmpty({ message: 'A descrição do negócio não pode ser vazia' })
  descricao_do_negocio: string;

  @IsString({ message: 'A localização do negócio deve ser uma string' })
  @IsNotEmpty({ message: 'A localização do negócio não pode ser vazia' })
  localizacao_do__negocio: string;

  @IsArray({ message: 'As fotos do negócio devem ser um array de strings' })
  @IsNotEmpty({ message: 'As fotos do negócio não podem ser vazias' })
  fotos_do_negocio: string[];

  @IsArray({ message: 'A documentação deve ser um array de strings' })
  @IsNotEmpty({ message: 'A documentação não pode ser vazia' })
  documentacao: string[];

  @IsOptional()
  observacoes?: string;
}
