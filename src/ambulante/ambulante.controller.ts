import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AmbulanteService } from './ambulante.service';
import { CreateAmbulanteDto } from './dto/create-ambulante.dto';
import { UpdateAmbulanteDto } from './dto/update-ambulante.dto';

@Controller('ambulante')
export class AmbulanteController {
  constructor(private readonly ambulanteService: AmbulanteService) {}

  @Post()
  create(@Body() createAmbulanteDto: CreateAmbulanteDto) {
    return this.ambulanteService.create(createAmbulanteDto);
  }

  @Get()
  findAll() {
    return this.ambulanteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ambulanteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAmbulanteDto: UpdateAmbulanteDto) {
    return this.ambulanteService.update(+id, updateAmbulanteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ambulanteService.remove(+id);
  }
}
