import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { v4 as uuidv4 } from 'uuid';
import { EmailService } from 'src/email/email.service';
import { UserMiddleware } from './middleware/user.middleware';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
    private readonly userMiddleware: UserMiddleware,
  ) {}

  async create(criarUsuarioDto: CriarUsuarioDto): Promise<Usuario> {
    const tokenDeVerificacao = uuidv4();
    const data: Prisma.UsuarioCreateInput = {
      ...criarUsuarioDto,
      senha: await bcrypt.hash(criarUsuarioDto.senha, 10),
      token_verificacao: tokenDeVerificacao,
    };

    await this.userMiddleware.validateUser(data);
    const createdUser = await this.prisma.usuario.create({ data });

    const confirmationLink = `${process.env.URL}/user/confirmar-email?token=${tokenDeVerificacao}`;
    await this.emailService.sendMail(
      criarUsuarioDto.email,
      'Confirme seu e-mail',
      `Clique no link para confirmar seu e-mail: ${confirmationLink}`,
    );

    return {
      ...createdUser,
      senha: undefined,
    };
  }

  findByEmail(email: string) {
    return this.prisma.usuario.findUnique({ where: { email } });
  }

  async confirmarEmail(token: string): Promise<void> {
    const user = await this.prisma.usuario.findFirst({
      where: { token_verificacao: token },
    });

    if (!user) {
      throw new HttpException('Token inválido', 400);
    }

    await this.prisma.usuario.update({
      where: { id: user.id },
      data: { token_verificacao: null, verificado: 'APROVADO' },
    });
  }
}
