import { HttpException, Injectable } from '@nestjs/common';
import { Prisma, StatusDeVerificacao } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import { v4 as uuidv4 } from 'uuid';
import { EmailService } from 'src/email/email.service';
import { UserMiddleware } from './middleware/user.middleware';
import { UpdateUserDto } from './dto/update-user.dto';
import emailDeVerificacaoHtml from 'src/email/email-de-verificacao';

function mapStringToStatusDeVerificacao(status: string): StatusDeVerificacao {
  switch (status) {
    case 'APROVADO':
      return StatusDeVerificacao.APROVADO;
    case 'PENDENTE':
      return StatusDeVerificacao.PENDENTE;
    case 'REJEITADO':
      return StatusDeVerificacao.REPROVADO;
    default:
      return undefined;
  }
}

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
    private readonly userMiddleware: UserMiddleware,
  ) {}

  async createUser(criarUsuarioDto: CriarUsuarioDto): Promise<any> {
    const tokenDeVerificacao = uuidv4();
    const { localizacao, ...userData } = criarUsuarioDto;
    const createdUser = await this.prisma.usuario.create({
      data: {
        ...userData,
        senha: await bcrypt.hash(criarUsuarioDto.senha, 10),
        token_verificacao: tokenDeVerificacao,
        Localizacao: {
          create: localizacao,
        },
      },
    });

    const confirmationLink = `${process.env.URL}/user/confirmar-email?token=${tokenDeVerificacao}`;
    const emailHtml = emailDeVerificacaoHtml(confirmationLink);
    await this.emailService.sendMail(
      criarUsuarioDto.email,
      'Confirme seu e-mail',
      emailHtml,
    );

    return {
      ...createdUser,
      senha: undefined,
    };
  }

  async updateUser(updateUserDto: UpdateUserDto, id: string): Promise<any> {
    await this.userMiddleware.userExists(id);

    const data: Prisma.UsuarioUpdateInput = {
      ...updateUserDto,
    };

    const updatedUser = await this.prisma.usuario.update({
      where: { id: id },
      data,
    });

    return {
      message: 'Usuário atualizado com sucesso',
      success: true,
      updatedUser,
    };
  }

  async getUser(search: string, filter: string) {
    if (
      filter &&
      !['ALL', 'APROVADO', 'PENDENTE', 'REJEITADO'].includes(filter)
    ) {
      throw new HttpException('Filtro inválido', 400);
    }

    const statusFilter =
      filter !== 'ALL' ? mapStringToStatusDeVerificacao(filter) : undefined;

    const where: Prisma.UsuarioWhereInput = {
      AND: [
        {
          OR: [
            { nome: { contains: search } },
            { email: { contains: search } },
            { cpf: { contains: search } },
          ],
        },
        filter
          ? {
              Ambulante: {
                some: {
                  status: statusFilter,
                },
              },
            }
          : {},
      ],
    };

    return this.prisma.usuario.findMany({
      where,
      include: {
        Ambulante: true,
      },
    });
  }
  async deleteUser(id: string) {
    await this.userMiddleware.userExists(id);
    await this.prisma.usuario.delete({ where: { id } });

    return { message: 'Usuário deletado com sucesso' };
  }

  findByEmail(email: string) {
    return this.prisma.usuario.findUnique({ where: { email } });
  }

  async confirmarEmail(token: string) {
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
