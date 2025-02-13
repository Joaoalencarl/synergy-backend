import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminTypeGuard } from './guards/admin-type.guard';

@Module({
  controllers: [AdminController],
  providers: [AdminService, EmailService, PrismaService, AdminTypeGuard],
  exports: [AdminService],
})
export class AdminModule {}
