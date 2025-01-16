import { StatusDeVerificacao, TipoDeUsuario } from '@prisma/client';
import {
  IsEmail,
  IsString,
  IsStrongPassword,
  IsDate,
  IsOptional,
  MaxLength,
  IsPhoneNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsCPF } from 'src/decorator/cpf.decorator';

export class UpdateUserDto {
  @IsString({ message: 'O nome informado é inválido' })
  @IsOptional()
  nome?: string;

  @IsEmail(
    {
      allow_ip_domain: false,
      allow_utf8_local_part: true,
      require_tld: true,
    },
    { message: 'O email informado é inválido' },
  )
  @IsOptional()
  email?: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    { message: 'A senha informada é fraca' },
  )
  @IsOptional()
  senha?: string;

  @IsCPF({ message: 'O CPF informado é inválido' })
  @IsOptional()
  cpf?: string;

  @IsDate({ message: 'A data de nascimento informada é inválida' })
  @Type(() => Date)
  @IsOptional()
  data_de_nascimento?: Date;

  @IsPhoneNumber('BR', { message: 'O telefone informado é inválido' })
  @IsOptional()
  telefone?: string;

  @IsOptional()
  @IsString()
  foto_url?: string;

  @IsOptional()
  @IsString({ message: 'A descrição informada é inválida' })
  @MaxLength(500, { message: 'A descrição informada é muito longa' })
  descricao?: string;

  @IsOptional({ message: 'O status de verificação informado é inválido' })
  verificado?: StatusDeVerificacao = StatusDeVerificacao.PENDENTE;

  @IsString({ message: 'O tipo de usuário informado é inválido' })
  @IsOptional()
  tipo?: TipoDeUsuario;

  @IsString({ message: 'O nome da rua informado é inválido' })
  @IsOptional()
  logradouro?: string;

  @IsString({ message: 'O número informado é inválido' })
  @IsOptional()
  numero?: string;

  @IsString({ message: 'O complemento informado é inválido' })
  @IsOptional()
  complemento?: string;

  @IsString({ message: 'O bairro informado é inválido' })
  @IsOptional()
  bairro?: string;

  @IsString({ message: 'A cidade informada é inválida' })
  @IsOptional()
  cidade?: string;

  @IsString({ message: 'O estado informado é inválido' })
  @IsOptional()
  estado?: string;

  @IsString({ message: 'O CEP informado é inválido' })
  @IsOptional()
  cep?: string;

  @IsString({ message: 'A localização informada é inválida' })
  @IsOptional()
  localizacao?: string; // GeoJSON Point (stringified)
}
