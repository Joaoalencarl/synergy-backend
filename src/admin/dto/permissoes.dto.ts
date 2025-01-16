import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreatePermissoesDto {
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
