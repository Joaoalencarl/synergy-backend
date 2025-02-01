import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePermissoesDto {
  @IsBoolean({
    message: 'O campo criação de usuário deve ser um valor booleano',
  })
  @IsNotEmpty({ message: 'O campo criação de usuário não pode ser vazio' })
  criacao_de_usuario: boolean;

  @IsBoolean({
    message: 'O campo distribuição de tarefas deve ser um valor booleano',
  })
  @IsNotEmpty({ message: 'O campo distribuição de tarefas não pode ser vazio' })
  distribuicao_de_tarefas: boolean;

  @IsBoolean({ message: 'O campo requisições deve ser um valor booleano' })
  @IsNotEmpty({ message: 'O campo requisições não pode ser vazio' })
  requisicoes: boolean;

  @IsBoolean({ message: 'O campo denúncias deve ser um valor booleano' })
  @IsNotEmpty({ message: 'O campo denúncias não pode ser vazio' })
  denuncias: boolean;

  @IsBoolean({ message: 'O campo infrações deve ser um valor booleano' })
  @IsNotEmpty({ message: 'O campo infrações não pode ser vazio' })
  infracoes: boolean;

  @IsBoolean({ message: 'O campo eventos deve ser um valor booleano' })
  @IsNotEmpty({ message: 'O campo eventos não pode ser vazio' })
  eventos: boolean;

  @IsBoolean({
    message: 'O campo relatórios estratégicos deve ser um valor booleano',
  })
  @IsNotEmpty({ message: 'O campo relatórios estratégicos não pode ser vazio' })
  relatorios_estrategicos: boolean;
}
export class UpdatePermissoesDto {
  @IsBoolean({
    message: 'O campo criação de usuário deve ser um valor booleano',
  })
  @IsOptional()
  criacao_de_usuario: boolean;

  @IsBoolean({
    message: 'O campo distribuição de tarefas deve ser um valor booleano',
  })
  @IsOptional()
  distribuicao_de_tarefas: boolean;

  @IsBoolean({ message: 'O campo requisições deve ser um valor booleano' })
  @IsOptional()
  requisicoes: boolean;

  @IsBoolean({ message: 'O campo denúncias deve ser um valor booleano' })
  @IsOptional()
  denuncias: boolean;

  @IsBoolean({ message: 'O campo infrações deve ser um valor booleano' })
  @IsOptional()
  infracoes: boolean;

  @IsBoolean({ message: 'O campo eventos deve ser um valor booleano' })
  @IsOptional()
  eventos: boolean;

  @IsBoolean({
    message: 'O campo relatórios estratégicos deve ser um valor booleano',
  })
  @IsOptional()
  relatorios_estrategicos: boolean;
}
