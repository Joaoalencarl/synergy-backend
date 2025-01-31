import { Module } from '@nestjs/common';
import { DenunciaService } from './denuncia.service';
import { DenunciaController } from './denuncia.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DenunciaController],
  providers: [DenunciaService, PrismaService],
})
export class DenunciaModule {}
