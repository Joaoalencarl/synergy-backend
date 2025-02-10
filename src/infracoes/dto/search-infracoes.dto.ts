export class SearchInfracoesDto {
  resultados_por_pagina: number | 20;
  pagina: number | 1;
  tipo_infracao?: number[];
  status?: number[];
  id_usuario?: string;
  bairro?: string;
  multa?: number;
  prazo?: number;
  ordem?: ordemDaInfracao;
}

enum ordemDaInfracao {
  DATA_REGISTRO_ASC = 'data_registro ASC',
  DATA_REGISTRO_DESC = 'data_registro DESC',
  PRAZO_ASC = 'prazo ASC',
  PRAZO_DESC = 'prazo DESC',
}
