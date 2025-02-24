import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { v4 as uuidv4 } from 'uuid';
import { EmailService } from 'src/email/email.service';
import { UserMiddleware } from './middleware/user.middleware';
import { UpdateUserDto } from './dto/update-user.dto';
import { generateUniqueCustomId } from 'src/config/generate-custom-id.config';
import emailDeVerificacaoHtml from 'src/email/email-de-verificacao';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
    private readonly userMiddleware: UserMiddleware,
  ) {}

  async createUser(criarUsuarioDto: CriarUsuarioDto): Promise<Usuario> {
    const id = await generateUniqueCustomId(6, this.prisma, 'usuario');
    const tokenDeVerificacao = uuidv4();
    const data: Prisma.UsuarioCreateInput = {
      ...criarUsuarioDto,
      id,
      senha: await bcrypt.hash(criarUsuarioDto.senha, 10),
      token_verificacao: tokenDeVerificacao,
    };

    await this.userMiddleware.validateUser(data);
    const createdUser = await this.prisma.usuario.create({ data });

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
    /*
    const users = await this.prisma.usuario.findMany({
      where: {
        OR: [
          { id: { contains: search } },
          { nome: { contains: search } },
          { email: { contains: search } },
          { cpf: { contains: search } },
        ],
      },
      include: {
        ambulante: true,
      },
    });

    if (users.length === 0) {
      throw new NotFoundException(
        `Nenhum usuário encontrado com o termo de busca: ${search}`,
      );
    }

    return {
      message: 'pesquisa realizada com sucesso',
      users: users.map((user) => {
        return {
          ...user,
          senha: undefined,
        };
      }),
    };
    Preciso filtrar resultados. Nessa rota seria possível adicionar filtro para exibir apenas usuários com requisições de ambulante? podendo assumir os seguintes valores: 

ALL // para mostrar todas
APROVADA // apenas usuários com requisições aprovadas
PENDENTE // apenas usuários com requisições pendentes REJEITADA // apenas usuários com requisições rejeitadas

Lembrando que essa também é uma rota que sofrerá mudanças com as alterações na tabela de ambulante

    */
    const user = await this.prisma.usuario.findMany({
      where: {
        OR: [
          { id: { contains: search } },
          { nome: { contains: search } },
          { email: { contains: search } },
          { cpf: { contains: search } },
        ],
      },
      include: {
        ambulante: true,
      },
    });

    if (!user) {
      throw new NotFoundException(
        `Nenhum usuário encontrado com o termo de busca: ${search}`,
      );
    }

    if (filter === 'ALL') {
      return {
        message: 'pesquisa realizada com sucesso',
        sucsses: true,
        users: user.map((user) => {
          return {
            ...user,
            senha: undefined,
          };
        }),
      };
    } else if (filter === 'APROVADA') {
      return {
        message: 'pesquisa realizada com sucesso',
        sucsses: true,
        users: user.filter((user) => user.verificado === 'APROVADO'),
      };
    } else if (filter === 'PENDENTE') {
      return {
        message: 'pesquisa realizada com sucesso',
        sucsses: true,
        users: user.filter((user) => user.verificado === 'PENDENTE'),
      };
    } else if (filter === 'REJEITADA') {
      return {
        message: 'pesquisa realizada com sucesso',
        sucsses: true,
        users: user.filter((user) => user.verificado === 'REPROVADO'),
      };
    } else {
      return {
        success: false,
        message:
          'Filtro inválido, utilize: ALL, APROVADO, PENDENTE ou REPROVADO',
      };
    }
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
