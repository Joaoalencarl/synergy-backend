import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import { UserService } from './usuario.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @IsPublic()
  @Post()
  createUser(@Body() createUserDto: CriarUsuarioDto) {
    return this.userService.createUser(createUserDto);
  }
  /* --> Criar um usuário não exige todos os campos, apenas os obrigatórios.
    curl --location 'http://localhost:3000/user' \
    --header 'Content-Type: application/json' \
    --data-raw '{
    "nome": "",
    "email": "",
    "senha": "",
    "cpf": "",
    "data_de_nascimento": "",
    "telefone": "",
    "foto_url": "",
    "descricao": "",
    "verificado": "",
    "tipo": "",
    "logradouro": "",
    "numero": "",
    "complemento": "",
    "bairro": "",
    "cidade": "",
    "estado": "",
    "cep": "",
    "localizacao": ""
    }'
  */

  @Patch()
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Query('id') id: string,
  ) {
    return this.userService.updateUser(updateUserDto, id);
  }
  /* --> Atualizar um usuário não exige todos os campos, apenas os que serão atualizados.
    curl --location --request PATCH 'http://{{host}}/user?id={{userId}}' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer {{BearerToken}}' \
     --data '{
      "nome": "João Antônio"
    }'
  */

  @Get()
  async getUser(
    @Query('search') search: string,
    @Query('filter') filter: string,
  ) {
    return this.userService.getUser(search, filter);
  }
  /* --> Para buscar um ou mais usuários, basta passar o nome, email ou cpf.
    curl --location 'http://{{host}}/user?search={{nome, email, cpf ou id}}&filter={{ALL, APROVADA, PENDENTE ou REPROVADO}}' \
  --header 'Authorization: Bearer {{BearerToken}}' \
 */

  @Delete()
  async deleteUser(@Query('id') id: string) {
    return this.userService.deleteUser(id);
  }
  /* --> Deletar um usuário exige apenas o id.
    curl --location --request DELETE 'http://{{host}}/user?id={{userId}}' \
    --header 'Authorization: Bearer {{BearerToken}}' \
    --data ''
  */

  @IsPublic()
  @Get('confirmar-email')
  async confirmarEmail(@Query('token') token: string) {
    await this.userService.confirmarEmail(token);
    return { message: 'E-mail confirmado com sucesso' };
  }
  /* --> Para confirmar o e-mail, basta passar o token.
    curl --location --request GET 'http://{{host}}/user/confirmar-email?token={{token}}' \
    --data ''
  */
}
