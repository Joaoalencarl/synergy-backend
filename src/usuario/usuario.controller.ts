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

  @Patch()
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Query('id') id: string,
  ) {
    return this.userService.updateUser(updateUserDto, id);
  }

  @Delete()
  async deleteUser(@Query('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @IsPublic()
  @Get('confirmar-email')
  async confirmarEmail(@Query('token') token: string) {
    await this.userService.confirmarEmail(token);
    return { message: 'E-mail confirmado com sucesso' };
  }
}
