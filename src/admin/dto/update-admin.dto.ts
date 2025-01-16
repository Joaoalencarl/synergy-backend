import { AdminType, StatusDeVerificacao } from '@prisma/client';
import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  IsStrongPassword,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePermissoesDto } from './permissoes.dto';

export class UpdateAdminDto {
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

  @IsIn(['SUPER_ADMIN', 'GESTOR', 'FISCAL'], {
    message: 'O tipo de administrador informado é inválido',
  })
  @IsOptional()
  adminType?: AdminType;

  @IsOptional({ message: 'O status de verificação informado é inválido' })
  verificado?: StatusDeVerificacao = StatusDeVerificacao.PENDENTE;

  @ValidateNested()
  @Type(() => CreatePermissoesDto)
  @IsOptional()
  Permissoes?: CreatePermissoesDto;
}
