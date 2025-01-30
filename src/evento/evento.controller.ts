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
import { EventoService } from './evento.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('evento')
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  @Post('/:admin-id')
  create(
    @Body() createEventoDto: CreateEventoDto,
    @Param('admin-id') adminId: string,
  ) {
    return this.eventoService.create(createEventoDto, adminId);
  }

  @IsPublic()
  @Get()
  findEvent(@Query('search') search: string) {
    return this.eventoService.findEvent(search);
  }

  @Patch(':admin-id')
  update(
    @Param('admin-id') adminId: string,
    @Query('evento-id') eventoId: string,
    @Body() updateEventoDto: UpdateEventoDto,
  ) {
    return this.eventoService.update(adminId, eventoId, updateEventoDto);
  }

  @Delete(':admin-id')
  remove(@Param('admin-id') id: string, @Query('evento-id') eventoId: string) {
    return this.eventoService.remove(id, eventoId);
  }

  @IsPublic()
  @Get('inscricao/:evento-id')
  subscribeEvent(
    @Param('evento-id') eventoId: string,
    @Query('ambulante-id') ambulanteId: string,
  ) {
    return this.eventoService.subscribeEvent(eventoId, ambulanteId);
  }
}
