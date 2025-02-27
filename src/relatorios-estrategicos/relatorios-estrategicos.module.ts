import { Module } from '@nestjs/common';
import { RelatoriosEstrategicosService } from './relatorios-estrategicos.service';
import { RelatoriosEstrategicosController } from './relatorios-estrategicos.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [RelatoriosEstrategicosController],
  providers: [RelatoriosEstrategicosService, PrismaService],
})
export class RelatoriosEstrategicosModule {}
