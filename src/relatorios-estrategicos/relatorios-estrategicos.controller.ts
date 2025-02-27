import { Controller, Get, Query } from '@nestjs/common';
import { RelatoriosEstrategicosService } from './relatorios-estrategicos.service';

@Controller('relatorios-estrategicos')
export class RelatoriosEstrategicosController {
  constructor(
    private readonly relatoriosEstrategicosService: RelatoriosEstrategicosService,
  ) {}

  @Get('usuarios-cadastrados')
  async getUsuariosCadastrados(
    @Query('inicio') inicio: Date,
    @Query('fim') fim: Date,
  ) {
    return this.relatoriosEstrategicosService.getUsuariosCadastrados(
      inicio,
      fim,
    );
  }

  @Get('ambulantes-cadastrados')
  async getAmbulantesCadastrados(
    @Query('inicio') inicio: Date,
    @Query('fim') fim: Date,
  ) {
    return this.relatoriosEstrategicosService.getAmbulantesCadastrados(
      inicio,
      fim,
    );
  }

  @Get('ambulantes-analizados-concessao')
  async getAmbulantesAnalizadosConcessao(
    @Query('inicio') inicio: Date,
    @Query('fim') fim: Date,
  ) {
    return this.relatoriosEstrategicosService.getAmbulantesAnalizadosConcessao(
      inicio,
      fim,
    );
  }

  @Get('infracoes')
  async getInfracoes(@Query('inicio') inicio: Date, @Query('fim') fim: Date) {
    return this.relatoriosEstrategicosService.getInfracoes(inicio, fim);
  }

  @Get('denuncias')
  async getDenuncias(@Query('inicio') inicio: Date, @Query('fim') fim: Date) {
    return this.relatoriosEstrategicosService.getDenuncias(inicio, fim);
  }
}
