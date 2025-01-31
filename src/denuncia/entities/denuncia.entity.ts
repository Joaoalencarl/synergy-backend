import {
  Usuario,
  ComentarioDeDenuncias,
  StatusDeDenuncia,
} from '@prisma/client';

export class Denuncias {
  id: string;
  usuario?: Usuario;
  usuario_id?: string;
  descricao: string;
  status: StatusDeDenuncia;
  localizacao?: string;
  fotos: string[];
  codigo_de_busca: string;
  comentarios_de_denuncia: ComentarioDeDenuncias[];
  createdAt: Date;
  updatedAt: Date;
}
