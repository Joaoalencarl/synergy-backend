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

  /* --> Criar um ambulante exige todos os campos, exceto os campos de data de criação e atualização.
    curl --location 'http://{{host}}/ambulante?usuario_id={{usuario_id}}' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer {{BearerToken}}' \
  --data '{
    "descricao": "",
    "nome_do_negocio": "",
    "tipo_do_negocio": "",
    "descricao_do_negocio": "",
    "localizacao_do__negocio": "",
    "fotos_do_negocio": ["", ""],
    "documentacao": ["", ""]
  }'
  */
  @Get()
  buscarAmbulante(@Query('ambulante_id') id: string) {
    return this.ambulanteService.buscarAmbulante(id);
  }
  /* --> Buscar um ambulante exige o id do ambulante.
    curl --location 'http://{{host}}/ambulante?ambulante_id={{ambulante_id}}' \
  --header 'Content-Type: application/json' \
  --header 'Authorization Bearer {{BearerToken}}'
  */

  @Patch(':id')
  alterarAmbulante(
    @Param('id') id: string,
    @Query('usuario_id') usuario_id: string,
    @Body() updateAmbulanteDto: UpdateAmbulanteDto,
  ) {
    return this.ambulanteService.update(id, updateAmbulanteDto);
  }
  /* --> Alterar um ambulante exige o id do ambulante, o id do usuário e os campos que serão alterados.
    curl --location 'http://{{host}}/ambulante/{{ambulante_id}}?usuario_id={{usuario_id}}' \
  --header 'Content-Type: application/json' \
  --header
  'Authorization Bearer {{BearerToken}}' \
  --data '{
    "descricao": "",
    "nome_do_negocio": "",
    "tipo_do_negocio": "",
    "descricao_do_negocio": "",
    "localizacao_do__negocio": "",
    "fotos_do_negocio": ["", ""],
    "documentacao": ["", ""]
  }'
  */

  @Delete()
  remove(@Query('ambulante_id') ambulante_id: string) {
    return this.ambulanteService.remove(ambulante_id);
  }
  /* --> Deletar um ambulante exige o id do ambulante e o id do usuário.
    curl --location 'http://{{host}}/ambulante?{{ambulante_id}}' \
  --header 'Content-Type: application/json' \
  --header 'Authorization Bearer {{BearerToken}}'
  */
}
