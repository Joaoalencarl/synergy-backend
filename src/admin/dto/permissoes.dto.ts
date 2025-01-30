import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePermissoesDto {
  @IsOptional({ message: 'O id informado é inválido' })
  id: string;

  @IsBoolean()
  @IsNotEmpty()
  criacao_de_usuario: boolean;

  @IsBoolean()
  @IsNotEmpty()
  distribuicao_de_tarefas: boolean;

  @IsBoolean()
  @IsNotEmpty()
  requisicoes: boolean;

  @IsBoolean()
  @IsNotEmpty()
  denuncias: boolean;

  @IsBoolean()
  @IsNotEmpty()
  infracoes: boolean;

  @IsBoolean()
  @IsNotEmpty()
  eventos: boolean;

  @IsBoolean()
  @IsNotEmpty()
  relatorios_estrategicos: boolean;
}
