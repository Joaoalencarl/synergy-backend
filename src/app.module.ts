import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './usuario/usuario.module';
import { EmailService } from './email/email.service';
import { AdminModule } from './admin/admin.module';
import { AmbulanteModule } from './ambulante/ambulante.module';
import { EventoModule } from './evento/evento.module';
import { DenunciaModule } from './denuncia/denuncia.module';
import { InfracoesModule } from './infracoes/infracoes.module';
import 'dotenv/config';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    AdminModule,
    AmbulanteModule,
    EventoModule,
    DenunciaModule,
    InfracoesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    EmailService,
  ],
})
export class AppModule {}
