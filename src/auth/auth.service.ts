import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from 'src/email/email.service';
import { generateUniqueCustomId } from 'src/config/generate-custom-id.config';
import emailDeRecuperacaoHtml from 'src/email/email-de-recuperacao';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly adminService: AdminService,
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async login(user: Usuario | Admin): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.nome,
    };

    return {
      access_token: this.jwtService.sign(payload),
      id: user.id,
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

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
          success: true,
          ...user,
          senha: undefined,
        };
      }
    }

    throw new UnauthorizedError('Endereço de e-mail ou senha inválidos.');
  }

  async validateAdmin(email: string, password: string): Promise<any> {
    const admin = await this.adminService.findByEmail(email);
    if (!admin) {
      throw new UnauthorizedException('Conta não existe.');
    }
    if (admin.verificado !== StatusDeVerificacao.APROVADO) {
      throw new UnauthorizedException(
        'Verifique seu e-mail para ativar a conta.',
      );
    }

    const isPasswordValid = await bcrypt.compare(password, admin.senha);
    if (isPasswordValid) {
      return {
        ...admin,
        senha: undefined,
      };
    }

    throw new UnauthorizedError('Endereço de e-mail ou senha inválidos.');
  }

  async requestPasswordReset(email: string) {
    const user =
      (await this.userService.findByEmail(email)) ||
      (await this.adminService.findByEmail(email));

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const token = await generateUniqueCustomId(4, this.prisma, 'Usuario');
    const expires = new Date();
    expires.setHours(expires.getHours() + 1);

    await this.prisma.usuario.update({
      where: { email },
      data: {
        passwordResetToken: token,
        passwordResetTokenExpires: expires,
      },
    });

    const resetLink = `https://ambulante.synergytecnologia.com.br/auth/reset-password?token=${token}`;
    const emailHtml = emailDeRecuperacaoHtml(resetLink);
    await this.emailService.sendMail(email, 'Recuperação de Senha', emailHtml);

    return {
      message: 'E-mail de recuperação de senha enviado com sucesso',
      success: true,
    };
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.prisma.usuario.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetTokenExpires: {
          gte: new Date(),
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.usuario.update({
      where: { id: user.id },
      data: {
        senha: hashedPassword,
        passwordResetToken: null,
        passwordResetTokenExpires: null,
      },
    });

    return { message: 'Senha redefinida com sucesso', sucess: true };
  }
}
