import { StatusDeVerificacao, TipoDeUsuario } from '@prisma/client';

export class Usuario {
  id: string;
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  data_de_nascimento: Date;
  telefone: string;
  foto_url?: string;
  descricao?: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  localizacao: string; // GeoJSON Point
  verificado: StatusDeVerificacao;
  tipo: TipoDeUsuario;
}
