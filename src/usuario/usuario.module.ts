import { Module } from '@nestjs/common';
import { UserController } from './usuario.controller';
import { UserService } from './usuario.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from 'src/email/email.service';
import { UserMiddleware } from './middleware/user.middleware';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, EmailService, UserMiddleware],
  exports: [UserService],
})
export class UserModule {}
