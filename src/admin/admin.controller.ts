import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { StatusDeVerificacao } from '@prisma/client';
import { AdminTypes } from './decorator/admin-type.decorator';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/:id')
  // @AdminTypes('SUPER_ADMIN')
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }
  /*

    curl --location '{{host}}/admin' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer {{BearerToken}}' \
  --data-raw '{
    "nome": "",
    "email": "",
    "senha": "",
    "adminType": "",
    "verificado": "",
    "Permissoes": {
      "criacao_de_usuario": ,
      "distribuicao_de_tarefas": ,
      "requisicoes": ,
      "denuncias": ,
      "infracoes": ,
      "eventos": ,
      "relatorios_estrategicos": 
    }
  }'

  */

  @HttpCode(HttpStatus.OK)
  @Patch('/:id')
  // AdminTypes('SUPER_ADMIN', 'GESTOR', 'FISCAL')
  async updateAdmin(
    @Body() updateAdminDto: UpdateAdminDto,
    @Query('id') id: string,
  ) {
    return this.adminService.updateAdmin(updateAdminDto, id);
  }
  /* --> Atualizar um administrador não exige todos os campos, apenas os que serão atualizados.

  curl --location --request PATCH 'http://{{host}}/admin?id={{AdminId}}' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer {{BearerToken}}' \
  --data '{
    "nome": ""
  }'

  */

  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  //@AdminTypes('SUPER_ADMIN')
  async deleteAdmin(@Query('deleted-user-id') id: string) {
    return this.adminService.deleteAdmin(id);
  }
  /* --> Para deletar um administrador, basta passar o id do administrador.

    curl --location --request DELETE 'http://{{host}}/admin?id={{AdminId}}' \
    --header 'Authorization: Bearer {{BearerToken}}' \
    --data ''

  */

  @HttpCode(HttpStatus.OK)
  @IsPublic()
  @Get('confirmar-email')
  async confirmarEmail(@Query('token') token: string) {
    await this.adminService.confirmarEmail(token);
    return { message: 'E-mail confirmado com sucesso' };
  }

  /* --> Para confirmar o e-mail do administrador, basta passar o token recebido no e-mail.
  
      curl --location --request GET 'http://{{host}}/admin/confirmar-email?token={{Token}}' \
      --data ''
    */

  @HttpCode(HttpStatus.OK)
  @Patch('/:id/requisicao-de-ambulante')
  // @AdminTypes('SUPER_ADMIN', 'GESTOR')
  async requisicaoDeAmbulante(
    @Query('ambulante_id') ambulante_id: string,
    @Query('admin_id') admin_id: string,
    @Body() alterarStatus: StatusDeVerificacao,
  ) {
    return this.adminService.requisicaoDeAmbulante(
      ambulante_id,
      admin_id,
      alterarStatus,
    );
  }
  /* --> Para requisitar um ambulante, basta passar o id do ambulante, o id do admin e o status de verificação.
  
      curl --location --request PATCH 'http://{{host}}/admin/requisicao-de-ambulante?ambulante_id={{AmbulanteId}}&admin_id={{AdminId}}' \
      --header 'Content-Type: application/json' \
      --header 'Authorization: Bearer {{BearerToken}}' \
      --data '{
        "status": "APROVADO", "REPROVADO", "PENDENTE"
      }'
    */

  @HttpCode(HttpStatus.OK)
  @Get()
  // @AdminTypes('SUPER_ADMIN')
  async findAdmin(@Query('search') search: string) {
    return this.adminService.findAdmin(search);
  }
  /* --> Para buscar um administrador, basta passar o termo de busca.

      curl --location --request GET 'http://{{host}}/admin?search={{Search}}' \
      --header 'Authorization: Bearer {{BearerToken}}' \
      --data ''
    */
}
