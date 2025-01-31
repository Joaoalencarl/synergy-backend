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

  @Post()
  create(
    @Body() createEventoDto: CreateEventoDto,
    @Query('admin-id') adminId: string,
  ) {
    return this.eventoService.create(createEventoDto, adminId);
  }
  /* --> Cria um evento, precisa do admin-id.
  curl --location '{{host}}/evento?admin-id={{admin-id}}' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer {{token}}' \
  --data '{
    "nome": "",
    "data_de_inicio": "",
    "data_de_fim": "",
    "localizacao": "",
    "ativo": true,
    "imagens": ["", ""],
    "descricao": "",
    "vagas": int
  }'
  --request POST
  */

  @IsPublic()
  @Get()
  findEvent(@Query('search') search: string) {
    return this.eventoService.findEvent(search);
  }
  /* --> Busca o evento pelo nome, localização ou data.
  curl --location '{{host}}/evento?search={{search}}' \
  --header 'Content-Type: application/json'
  --request GET
  */

  @Patch(':admin-id')
  update(
    @Param('admin-id') adminId: string,
    @Query('evento-id') eventoId: string,
    @Body() updateEventoDto: UpdateEventoDto,
  ) {
    return this.eventoService.update(adminId, eventoId, updateEventoDto);
  }
  /* --> Atualiza o evento, precisa do admin-id e do evento-id.
  curl --location '{{host}}/evento/{{admin-id}}?evento-id={{evento-id}}' \
  --header 'Content-Type: application/json' \
  --header 'Authorization Bearer {{token}}' \
  --data '{
    "nome": "",
    "data_de_inicio": "",
    "data_de_fim": "",
    "localizacao": "",
    "ativo": true,
    "imagens": ["", ""],
    "descricao": "",
    "vagas": int
  }'
  --request PATCH
  */

  @Delete(':admin-id')
  remove(@Param('admin-id') id: string, @Query('evento-id') eventoId: string) {
    return this.eventoService.remove(id, eventoId);
  }
  /* --> Remove o evento, precisa do admin-id e do evento-id.
  curl --location '{{host}}/evento/{{admin-id}}?evento-id={{evento-id}}' \
  --header 'Content-Type: application/json' \
  --header 'Authorization Bearer {{token}}' \
  --request DELETE
  */

  @IsPublic()
  @Get('inscricao/:evento-id')
  subscribeEvent(
    @Param('evento-id') eventoId: string,
    @Query('ambulante-id') ambulanteId: string,
  ) {
    return this.eventoService.subscribeEvent(eventoId, ambulanteId);
  }
  /* --> Inscreve o ambulante no evento, precisa do evento-id e do ambulante-id.
  curl --location '{{host}}/evento/inscricao/{{evento-id}}?ambulante-id={{ambulante-id}}' \
  --header 'Content-Type: application/json' \
  --header 'Authorization Bearer {{token}}' \
  --request GET
  */
}
