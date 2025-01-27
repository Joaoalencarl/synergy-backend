import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { v4 as uuidv4 } from 'uuid';
import { Prisma, StatusDeVerificacao } from '@prisma/client';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto) {
    const tokenDeVerificacao = uuidv4();
    const permissoes = createAdminDto.Permissoes;
    const data: Prisma.AdminCreateInput = {
      ...createAdminDto,
      senha: await bcrypt.hash(createAdminDto.senha, 10),
      token_verificacao: tokenDeVerificacao,
      Permissoes: {
        create: permissoes,
      },
    };

    const createdAdmin = await this.prisma.admin.create({ data });

    const confirmationLink = `${process.env.URL}/admin/confirmar-email?token=${tokenDeVerificacao}`;
    await this.emailService.sendMail(
      createAdminDto.email,
      'Confirme seu e-mail',
      `Clique no link para confirmar seu e-mail: ${confirmationLink}`,
    );

    return {
      message: 'Admin criado com sucesso',
      ...createdAdmin,
      senha: undefined,
      token_verificacao: undefined,
    };
  }

  async updateAdmin(updateAdminDto: UpdateAdminDto, id: string) {
    const permissoes = updateAdminDto.Permissoes;
    const data: Prisma.AdminUpdateInput = {
      ...updateAdminDto,
      Permissoes: {
        create: permissoes,
      },
    };

    const updatedAdmin = await this.prisma.admin.update({
      where: { id },
      data,
    });

    return {
      message: 'Admin atualizado com sucesso',
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
      throw new Error('Token de verificação inválido');
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
      throw new Error('Admin não encontrado');
    } else if (
      (await this.prisma.ambulante.findUnique({
        where: { id: ambulante_id },
      })) === null
    ) {
      throw new Error('Ambulante não encontrado');
    } else if (
      alterarStatus !== 'APROVADO' &&
      alterarStatus !== 'REPROVADO' &&
      alterarStatus !== 'PENDENTE'
    ) {
      throw new Error('Status inválido');
    }

    const data = this.prisma.ambulante.update({
      where: { id: ambulante_id },
      data: { status: alterarStatus },
    });

    return {
      message: 'Status do ambulante alterado com sucesso',
      ...data,
    };
  }
}
