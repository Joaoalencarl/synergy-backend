import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import { UserService } from './usuario.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('user')
@IsPublic()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  create(@Body() createUserDto: CriarUsuarioDto) {
    return this.userService.create(createUserDto);
  }

  @Get('confirmar-email')
  async confirmarEmail(@Query('token') token: string) {
    await this.userService.confirmarEmail(token);
    return { message: 'E-mail confirmado com sucesso' };
  }
}
