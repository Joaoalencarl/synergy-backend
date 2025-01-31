import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DenunciaService } from './denuncia.service';
import { CreateDenunciaDto } from './dto/create-denuncia.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('denuncia')
export class DenunciaController {
  constructor(private readonly denunciaService: DenunciaService) {}

  @IsPublic()
  @Post()
  create(
    @Body() createDenunciaDto: CreateDenunciaDto,
    @Query('usuario_id') usuario_id: string,
  ) {
    return this.denunciaService.create(createDenunciaDto, usuario_id);
  }
  /* --> Post pode ser feito sem o usuário, mas se for feito com o usuário, a denúncia será conectada ao usuário.
  curl --location '{{host}}/denuncia?id={{user-id}}' \
  --header 'Content-Type: application/json' \
  --data '{
      "descricao": "",
      "localizacao": "",
      "fotos": ["", ""]
  }'
  --request POST
  */

  @IsPublic()
  @Get()
  findDenuncia(@Query('codigo_de_busca') codigo_de_busca: string) {
    return this.denunciaService.findDenuncia(codigo_de_busca);
  }
  /* --> Busca a denúncia pelo código de busca.
  curl --location '{{host}}/denuncia?codigo_de_busca={{codigo_de_busca}}' \
  --header 'Content-Type: application/json'
  --request GET
  */

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.denunciaService.remove(id);
  }
  /* --> Remove a denúncia pelo id.
  curl --location '{{host}}/denuncia/{{denuncia-id}}' \
  --header 'Content-Type: application/json' \
  --request DELETE
  */

  @Post(':id/comentario')
  addComentario(
    @Body('comentario') comentario: string,
    @Param('id') id: string,
    @Query('admin-id') admin_id: string,
  ) {
    return this.denunciaService.addComentario(comentario, id, admin_id);
  }
  /* --> Adiciona um comentário à denúncia.
  curl --location '{{host}}/denuncia/{{denuncia-id}}/comentario?admin-id={{admin-id}}' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer {{token}}' \
  --data '{
      "comentario": ""
  }'
  --request POST
  */
}
