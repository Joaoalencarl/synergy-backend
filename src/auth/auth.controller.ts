import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
  /* --> O login é feito com o email e a senha do usuário ou do admin.

  curl --location 'http://{{host}}/login' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "email": "",
      "password": ""
  }'
  */

  @Post('request-password-reset')
  async requestPasswordReset(@Body('email') email: string) {
    return this.authService.requestPasswordReset(email);
  }
  /* --> O usuário ou admin solicita a troca de senha.

  curl --location --request POST 'http://{{host}}/request-password-reset' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "email": ""
  }'
  */

  @Post('reset-password')
  async resetPassword(
    @Query('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.authService.resetPassword(token, newPassword);
  }
  /* --> O usuário ou admin troca a senha.

  curl --location --request POST 'http://{{host}}/reset-password?token=' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "newPassword": ""
  }'
  */
}
