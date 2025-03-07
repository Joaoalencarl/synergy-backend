import { StatusDeVerificacao, TipoDeUsuario } from '@prisma/client';
import {
  IsEmail,
  IsString,
  IsStrongPassword,
  IsDate,
  IsOptional,
  MaxLength,
  IsPhoneNumber,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsCPF } from 'src/decorator/cpf.decorator';

export class CriarUsuarioDto {
  @IsString({ message: 'O nome informado é inválido' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;

  @IsEmail(
    {
      allow_ip_domain: false,
      allow_utf8_local_part: true,
      require_tld: true,
    },
    { message: 'O email informado é inválido' },
  )
  @IsNotEmpty({ message: 'O email não pode ser vazio' })
  email: string;

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
  @IsNotEmpty({ message: 'A senha não pode ser vazia' })
  senha: string;

  @IsCPF({ message: 'O CPF informado é inválido' })
  @IsNotEmpty({ message: 'O CPF não pode ser vazio' })
  cpf: string;

  @IsDate({ message: 'A data de nascimento informada é inválida' })
  @Type(() => Date)
  @IsOptional()
  data_de_nascimento: Date | null;

  @IsPhoneNumber('BR', { message: 'O telefone informado é inválido' })
  @IsOptional()
  telefone: string;

  @IsOptional({ message: 'A foto informada é inválida' })
  @IsString()
  foto_url?: string;

  @IsOptional()
  @IsString({ message: 'A descrição informada é inválida' })
  @MaxLength(500, { message: 'A descrição informada é muito longa' })
  descricao?: string;
  @IsOptional({ message: 'O status de verificação informado é inválido' })
  verificado: StatusDeVerificacao = StatusDeVerificacao.PENDENTE;

  @IsString({ message: 'O tipo de usuário informado é inválido' })
  @IsOptional()
  tipo: TipoDeUsuario;

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
}
