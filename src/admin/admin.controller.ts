import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @IsPublic()
  @Post()
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }
  /*

    curl --location '{{host}}/admin' \
  --header 'Content-Type: application/json' \
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

  @Patch()
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

  @Delete()
  async deleteAdmin(@Query('id') id: string) {
    return this.adminService.deleteAdmin(id);
  }
  /* --> Para deletar um administrador, basta passar o id do administrador.

    curl --location --request DELETE 'http://{{host}}/admin?id={{AdminId}}' \
    --header 'Authorization: Bearer {{BearerToken}}' \
    --data ''

  */

  @IsPublic()
  @Get('confirmar-email')
  async confirmarEmail(@Query('token') token: string) {
    await this.adminService.confirmarEmail(token);
    return { message: 'E-mail confirmado com sucesso' };
  }
}
