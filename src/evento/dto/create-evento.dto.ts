import {
  IsString,
  IsDate,
  IsBoolean,
  IsArray,
  IsInt,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateLocalizationDto } from 'src/denuncia/dto/create-denuncia.dto';

export class CreateEventoDto {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;

  @IsDate({ message: 'A data de início deve ser uma data válida' })
  @Type(() => Date)
  @IsNotEmpty({ message: 'A data de início não pode ser vazia' })
  data_de_inicio: Date;

  @IsDate({ message: 'A data de fim deve ser uma data válida' })
  @Type(() => Date)
  @IsNotEmpty({ message: 'A data de fim não pode ser vazia' })
  data_de_fim: Date;

  @IsString({ message: 'A localização deve ser uma string' })
  @IsNotEmpty({ message: 'A localização não pode ser vazia' })
  localizacao: CreateLocalizationDto;

  @IsBoolean({ message: 'O campo ativo deve ser um booleano' })
  @IsNotEmpty({ message: 'O campo ativo não pode ser vazio' })
  ativo: boolean;

  @IsArray({ message: 'As imagens devem ser um array de strings' })
  @IsNotEmpty({ message: 'As imagens não podem ser vazias' })
  imagens: string[];

  @IsString({ message: 'A descrição deve ser uma string' })
  @IsNotEmpty({ message: 'A descrição não pode ser vazia' })
  descricao: string;

  @IsInt({ message: 'O número de vagas deve ser um inteiro' })
  @IsNotEmpty({ message: 'O número de vagas não pode ser vazio' })
  vagas: number;
}
