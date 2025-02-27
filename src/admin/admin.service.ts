import { Injectable, NotFoundException } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { v4 as uuidv4 } from 'uuid';
import { Prisma, StatusDeVerificacao } from '@prisma/client';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';
import generateEmailHtml from 'src/email/email-de-verificacao';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto) {
    //vai sair na orimização do produto e vai para uma rota auxiliar
    if (
      (await this.prisma.admin.findFirst({
        where: { email: createAdminDto.email },
      })) !== null
    ) {
      throw new NotFoundException('Email já cadastrado');
    }

    // ---------------------
    const tokenDeVerificacao = uuidv4();
    const permissoes = createAdminDto.Permissoes;
    const data: Prisma.AdminCreateInput = {
      ...createAdminDto,
      senha: await bcrypt.hash(createAdminDto.senha, 10),
      token_verificacao: tokenDeVerificacao,
      Permissoes: {
        create: {
          ...permissoes,
        },
      },
    };
    const createdAdmin = await this.prisma.admin.create({ data });

    if (data.verificado !== 'APROVADO') {
      const confirmationLink = `${process.env.URL}/admin/confirmar-email?token=${tokenDeVerificacao}`;
      const emailHtml = generateEmailHtml(confirmationLink);
      await this.emailService.sendMail(
        createAdminDto.email,
        'Confirme seu e-mail',
        emailHtml,
      );
    }

    return {
      message: 'Admin criado com sucesso',
      success: true,
      ...createdAdmin,
      senha: undefined,
      token_verificacao: undefined,
    };
  }

  async updateAdmin(updateAdminDto: UpdateAdminDto, id: string) {
    const admin = await this.prisma.admin.findUnique({ where: { id } });

    if (!admin) {
      throw new NotFoundException('Admin não encontrado');
    }

    const adminData: Prisma.AdminUpdateInput = {
      ...updateAdminDto,
      senha: updateAdminDto.senha
        ? await bcrypt.hash(updateAdminDto.senha, 10)
        : undefined,
      Permissoes: updateAdminDto.Permissoes
        ? {
            update: {
              where: { id: id },
              data: {
                criacao_de_usuario:
                  updateAdminDto.Permissoes.criacao_de_usuario,
                distribuicao_de_tarefas:
                  updateAdminDto.Permissoes.distribuicao_de_tarefas,
                requisicoes: updateAdminDto.Permissoes.requisicoes,
                denuncias: updateAdminDto.Permissoes.denuncias,
                infracoes: updateAdminDto.Permissoes.infracoes,
                eventos: updateAdminDto.Permissoes.eventos,
                relatorios_estrategicos:
                  updateAdminDto.Permissoes.relatorios_estrategicos,
              },
            },
          }
        : undefined,
    };

    const updatedAdmin = await this.prisma.admin.update({
      where: { id },
      data: adminData,
      include: { Permissoes: true },
    });

    return {
      message: 'Admin atualizado com sucesso',
      success: true,
      ...updatedAdmin,
      senha: undefined,
      token_verificacao: undefined,
    };
  }

  async deleteAdmin(id: string) {
    await this.prisma.admin.delete({ where: { id } });

    return { message: 'Admin deletado com sucesso' };
  }

  async confirmarEmail(token: string) {
    const admin = await this.prisma.admin.findFirst({
      where: { token_verificacao: token },
    });

    if (!admin) {
      throw new NotFoundException('Token de verificação inválido');
    }

    await this.prisma.admin.update({
      where: { id: admin.id },
      data: { verificado: 'APROVADO' },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.admin.findFirst({ where: { email } });
  }

  async requisicaoDeAmbulante(
    ambulante_id: string,
    admin_id: string,
    alterarStatus: StatusDeVerificacao,
  ) {
    if (
      (await this.prisma.admin.findUnique({ where: { id: admin_id } })) === null
    ) {
      throw new NotFoundException('Admin não encontrado');
    } else if (
      (await this.prisma.ambulante.findUnique({
        where: { id: ambulante_id },
      })) === null
    ) {
      throw new NotFoundException('Ambulante não encontrado');
    } else if (
      alterarStatus !== 'APROVADO' &&
      alterarStatus !== 'REPROVADO' &&
      alterarStatus !== 'PENDENTE'
    ) {
      throw new NotFoundException('Status inválido');
    }

    const data = this.prisma.ambulante.update({
      where: { id: ambulante_id },
      data: { status: alterarStatus, analyzedAt: new Date() },
    });

    return {
      message: 'Status do ambulante alterado com sucesso',
      success: true,
      ...data,
    };
  }

  async findAdmin(search: string) {
    //quando não tiver nada no search, retornar todos os admins
    if (search === '') {
      const admins = await this.prisma.admin.findMany({
        include: { Permissoes: true },
      });

      return {
        message: 'Admins encontrados com sucesso',
        success: true,
        ...admins,
        senha: undefined,
        token_verificacao: undefined,
      };
    }

    const admin = await this.prisma.admin.findMany({
      where: {
        OR: [{ id: { contains: search } }, { email: { contains: search } }],
      },
      include: { Permissoes: true },
    });

    if (!admin) {
      throw new NotFoundException('Admin não encontrado');
    }

    return {
      message: 'Admin encontrado com sucesso',
      success: true,
      ...admin,
      senha: undefined,
      token_verificacao: undefined,
    };
  }
}
