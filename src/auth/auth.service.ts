import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from './errors/unauthorized.error';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UserService } from 'src/usuario/usuario.service';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';
import { StatusDeVerificacao } from '@prisma/client';
import { Admin } from 'src/admin/entities/admin.entity';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly adminService: AdminService,
  ) {}

  async login(user: Usuario | Admin): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.nome,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user =
      (await this.userService.findByEmail(email)) ||
      (await this.adminService.findByEmail(email));
    console.log(user);
    if (!user) {
      throw new UnauthorizedException('Conta não existe.');
    }
    if (user.verificado !== StatusDeVerificacao.APROVADO) {
      throw new UnauthorizedException(
        'Verifique seu e-mail para ativar a conta.',
      );
    }
    if (user.verificado !== StatusDeVerificacao.APROVADO) {
      throw new UnauthorizedException(
        'Verifique seu e-mail para ativar a conta.',
      );
    }

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.senha);
      console.log(isPasswordValid);
      if (isPasswordValid) {
        return {
          ...user,
          senha: undefined,
        };
      }
    }

    throw new UnauthorizedError('Enderesso de e-mail ou senha inválidos.');
  }
}
