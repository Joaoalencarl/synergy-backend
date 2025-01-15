import { AdminType, Permissoes, StatusDeVerificacao } from '@prisma/client';

export class Admin {
  id: string;
  nome: string;
  email: string;
  senha: string;
  adminType: AdminType;
  verificado: StatusDeVerificacao;
  Permissoes: Permissoes;
}
