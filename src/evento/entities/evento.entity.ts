import { InscricoesDeEventos } from '@prisma/client';

export class Evento {
  id: string;
  nome: string;
  data_de_inicio: Date;
  data_de_fim: Date;
  localizacao: string;
  ativo: boolean;
  imagens: string[];
  descricao: string;
  vagas: number;
  InscricoesDeEventos?: InscricoesDeEventos[];
}
