import { IsOptional, IsArray, IsNumber, IsString } from 'class-validator';

export class UpdateInfracoeDto {
  @IsString()
  id_infracao: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsString()
  bairro?: string;

  @IsOptional()
  @IsString()
  ponto_de_referencia?: string;

  @IsOptional()
  @IsArray()
  id_tipo_infracao?: number[];

  @IsOptional()
  @IsArray()
  imagens?: string[];

  @IsOptional()
  @IsString()
  observacoes?: string;

  @IsOptional()
  @IsArray()
  id_tipo_providencia?: number[];

  @IsOptional()
  @IsString()
  multa?: string;

  @IsOptional()
  @IsString()
  prazo?: string;

  @IsOptional()
  @IsString()
  assinatura?: string;

  @IsOptional()
  @IsNumber()
  status?: number;
}
