import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AmbulanteService } from './ambulante.service';
import { CreateAmbulanteDto } from './dto/create-ambulante.dto';
import { UpdateAmbulanteDto } from './dto/update-ambulante.dto';

@Controller('ambulante')
export class AmbulanteController {
  constructor(private readonly ambulanteService: AmbulanteService) {}

  @Post()
  create(
    @Body() createAmbulanteDto: CreateAmbulanteDto,
    @Query('usuario_id') usuario_id: string,
  ) {
    return this.ambulanteService.create(createAmbulanteDto, usuario_id);
  }

  @Get()
  findAll(@Query('usuario_id') usuario_id: string) {
    return this.ambulanteService.findAll(usuario_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('usuario_id') usuario_id: string) {
    return this.ambulanteService.findOne(id, usuario_id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Query('usuario_id') usuario_id: string,
    @Body() updateAmbulanteDto: UpdateAmbulanteDto,
  ) {
    return this.ambulanteService.update(id, usuario_id, updateAmbulanteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Query('usuario_id') usuario_id: string) {
    return this.ambulanteService.remove(id, usuario_id);
  }
}
