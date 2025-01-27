import { Module } from '@nestjs/common';
import { AmbulanteService } from './ambulante.service';
import { AmbulanteController } from './ambulante.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserMiddleware } from 'src/usuario/middleware/user.middleware';

@Module({
  controllers: [AmbulanteController],
  providers: [AmbulanteService, PrismaService, UserMiddleware],
  exports: [AmbulanteService],
})
export class AmbulanteModule {}
