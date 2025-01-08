import { Body, Controller, Post } from '@nestjs/common';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import { UserService } from './usuario.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @IsPublic()
  @Post()
  create(@Body() createUserDto: CriarUsuarioDto) {
    return this.userService.create(createUserDto);
  }
}
