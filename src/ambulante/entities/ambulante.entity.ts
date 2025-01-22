import { StatusDeVerificacao } from '@prisma/client';

export class Ambulante {
  usuario?: string;
  usuario_id?: string;
  descripcion: string;
  status: StatusDeVerificacao = 'PENDENTE';
  nome_do_negocio: string;
  tipo_de_negocio: string;
  descricao_do_negocio: string;
  localizacao_do_negocio: string;
  fotos_do_negocio: string[];
  documentacao: string[];
  createdAt: Date;
  updatedAt: Date;
}
