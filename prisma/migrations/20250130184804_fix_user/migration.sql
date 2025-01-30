/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Ambulante` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Permissoes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "StatusDeDenuncia" AS ENUM ('RECEBIDA', 'EM_ANALISE', 'CONCLUIDA');

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "data_de_nascimento" DROP NOT NULL,
ALTER COLUMN "telefone" DROP NOT NULL,
ALTER COLUMN "logradouro" DROP NOT NULL,
ALTER COLUMN "numero" DROP NOT NULL,
ALTER COLUMN "bairro" DROP NOT NULL,
ALTER COLUMN "cidade" DROP NOT NULL,
ALTER COLUMN "estado" DROP NOT NULL,
ALTER COLUMN "cep" DROP NOT NULL,
ALTER COLUMN "localizacao" DROP NOT NULL,
ALTER COLUMN "verificado" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Denuncias" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT,
    "descricao" TEXT NOT NULL,
    "status" "StatusDeDenuncia" NOT NULL,
    "localizacao" TEXT,
    "fotos" TEXT[],
    "codigo_de_busca" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Denuncias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComentarioDeDenuncias" (
    "id" TEXT NOT NULL,
    "denuncia_id" TEXT NOT NULL,
    "fiscal_id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "ComentarioDeDenuncias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evento" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "data_de_inicio" TIMESTAMP(3) NOT NULL,
    "data_de_fim" TIMESTAMP(3) NOT NULL,
    "localizacao" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL,
    "imagens" TEXT[],
    "descricao" TEXT NOT NULL,
    "vagas" INTEGER NOT NULL,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InscricoesDeEventos" (
    "id" TEXT NOT NULL,
    "evento_id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "data_de_inscricao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "StatusDeVerificacao" NOT NULL,

    CONSTRAINT "InscricoesDeEventos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Denuncias_id_key" ON "Denuncias"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ComentarioDeDenuncias_id_key" ON "ComentarioDeDenuncias"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Evento_id_key" ON "Evento"("id");

-- CreateIndex
CREATE UNIQUE INDEX "InscricoesDeEventos_id_key" ON "InscricoesDeEventos"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_id_key" ON "Admin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Ambulante_id_key" ON "Ambulante"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Permissoes_id_key" ON "Permissoes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_id_key" ON "Usuario"("id");

-- AddForeignKey
ALTER TABLE "Denuncias" ADD CONSTRAINT "Denuncias_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComentarioDeDenuncias" ADD CONSTRAINT "ComentarioDeDenuncias_denuncia_id_fkey" FOREIGN KEY ("denuncia_id") REFERENCES "Denuncias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComentarioDeDenuncias" ADD CONSTRAINT "ComentarioDeDenuncias_fiscal_id_fkey" FOREIGN KEY ("fiscal_id") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InscricoesDeEventos" ADD CONSTRAINT "InscricoesDeEventos_evento_id_fkey" FOREIGN KEY ("evento_id") REFERENCES "Evento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InscricoesDeEventos" ADD CONSTRAINT "InscricoesDeEventos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
