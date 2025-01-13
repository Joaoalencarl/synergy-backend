-- CreateEnum
CREATE TYPE "AdminType" AS ENUM ('SUPER_ADMIN', 'GESTOR', 'FISCAL');

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "adminType" "AdminType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permissoes" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "criacao_de_usuario" BOOLEAN NOT NULL,
    "distribuicao_de_tarefas" BOOLEAN NOT NULL,
    "requisicoes" BOOLEAN NOT NULL,
    "denuncias" BOOLEAN NOT NULL,
    "infracoes" BOOLEAN NOT NULL,
    "eventos" BOOLEAN NOT NULL,
    "relatorios_estrategicos" BOOLEAN NOT NULL,

    CONSTRAINT "Permissoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Permissoes_adminId_key" ON "Permissoes"("adminId");

-- AddForeignKey
ALTER TABLE "Permissoes" ADD CONSTRAINT "Permissoes_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
