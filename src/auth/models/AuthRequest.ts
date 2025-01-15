import { Request } from 'express';
import { Admin } from 'src/admin/entities/admin.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

export interface AuthRequest extends Request {
  user: Usuario | Admin;
}
