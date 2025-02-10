import { Module } from '@nestjs/common';
import { InfracoesService } from './infracoes.service';
import { InfracoesController } from '../prisma/infracoes.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [InfracoesController],
  providers: [InfracoesService, PrismaService],
})
export class InfracoesModule {}
