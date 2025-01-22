import { Module } from '@nestjs/common';
import { AmbulanteService } from './ambulante.service';
import { AmbulanteController } from './ambulante.controller';

@Module({
  controllers: [AmbulanteController],
  providers: [AmbulanteService],
})
export class AmbulanteModule {}
