import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { InfracoesService } from '../infracoes/infracoes.service';
import { CreateInfracoeDto } from '../infracoes/dto/create-infracoe.dto';
import { SearchInfracoesDto } from 'src/infracoes/dto/search-infracoes.dto';
import { UpdateInfracoeDto } from 'src/infracoes/dto/update-infracoe.dto';

@Controller('infracoes')
export class InfracoesController {
  constructor(private readonly infracoesService: InfracoesService) {}

  @Post()
  create(
    @Body() createInfracoeDto: CreateInfracoeDto,
    @Query('admin_id') admin_id: string,
  ) {
    return this.infracoesService.create(createInfracoeDto, admin_id);
  }

  @Get()
  searchInfracoes(@Body() searchInfracoesDto: SearchInfracoesDto) {
    return this.infracoesService.searchInfracoes(searchInfracoesDto);
  }
  @Patch('update')
  async updateInfracoe(@Body() updateInfracoeDto: UpdateInfracoeDto) {
    return this.infracoesService.updateInfracoe(updateInfracoeDto);
  }

  @Delete('delete/:id')
  async deleteInfracoe(@Param('id') id_infracao: string) {
    return this.infracoesService.deleteInfracoe(id_infracao);
  }
}
