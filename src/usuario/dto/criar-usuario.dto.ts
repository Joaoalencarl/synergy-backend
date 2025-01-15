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
  @IsNotEmpty({ message: 'A data de nascimento não pode ser vazia' })
  data_de_nascimento: Date;

  @IsPhoneNumber('BR', { message: 'O telefone informado é inválido' })
  @IsNotEmpty({ message: 'O telefone não pode ser vazio' })
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
  tipo: TipoDeUsuario;

  @IsString({ message: 'O nome da rua informado é inválido' })
  @IsNotEmpty({ message: 'O logradouro não pode ser vazio' })
  logradouro: string;

  @IsString({ message: 'O número informado é inválido' })
  @IsNotEmpty({ message: 'O número não pode ser vazio' })
  numero: string;

  @IsString({ message: 'O complemento informado é inválido' })
  @IsNotEmpty({ message: 'O complemento não pode ser vazio' })
  complemento: string;

  @IsString({ message: 'O bairro informado é inválido' })
  @IsNotEmpty({ message: 'O bairro não pode ser vazio' })
  bairro: string;

  @IsString({ message: 'A cidade informada é inválida' })
  @IsNotEmpty({ message: 'A cidade não pode ser vazia' })
  cidade: string;

  @IsString({ message: 'O estado informado é inválido' })
  @IsNotEmpty({ message: 'O estado não pode ser vazio' })
  estado: string;

  @IsString({ message: 'O CEP informado é inválido' })
  @IsNotEmpty({ message: 'O CEP não pode ser vazio' })
  cep: string;

  @IsString({ message: 'A localização informada é inválida' })
  localizacao: string; // GeoJSON Point (stringified)
}
