import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDenunciaDto {
  @IsNotEmpty({ message: 'Informe o título da denúncia' })
  descricao: string;

  @IsOptional()
  localizacao: CreateLocalizationDto[];

  @IsOptional()
  fotos?: string[];
}

export class CreateLocalizationDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsString()
  logradouro?: string;

  @IsOptional()
  @IsString()
  numero?: string;

  @IsOptional()
  @IsString()
  complemento?: string;

  @IsOptional()
  @IsString()
  bairro?: string;

  @IsOptional()
  @IsString()
  cidade?: string;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsString()
  cep?: string;

  @IsOptional()
  @IsString()
  usuarioId?: string;

  @IsOptional()
  @IsString()
  ambulanteId?: string;

  @IsOptional()
  @IsString()
  denunciasId?: string;

  @IsOptional()
  @IsString()
  infracaoId?: string;
}
