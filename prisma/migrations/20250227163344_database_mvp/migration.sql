/*
  Warnings:

  - You are about to drop the column `localizacao_do__negocio` on the `Ambulante` table. All the data in the column will be lost.
  - You are about to drop the column `localizacao` on the `Denuncias` table. All the data in the column will be lost.
  - You are about to drop the column `localizacao` on the `Evento` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Infracao` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Infracao` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `bairro` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `cep` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `cidade` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `complemento` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `localizacao` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `logradouro` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `numero` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `localizacao_id` to the `Evento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adminId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ambulante" DROP CONSTRAINT "Ambulante_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "ComentarioDeDenuncias" DROP CONSTRAINT "ComentarioDeDenuncias_fiscal_id_fkey";

-- DropForeignKey
ALTER TABLE "Denuncias" DROP CONSTRAINT "Denuncias_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "Infracao" DROP CONSTRAINT "Infracao_administrador_id_fkey";

-- DropForeignKey
ALTER TABLE "Infracao" DROP CONSTRAINT "Infracao_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_chatId_fkey";

-- AlterTable
ALTER TABLE "Ambulante" DROP COLUMN "localizacao_do__negocio",
ADD COLUMN     "analyzedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Denuncias" DROP COLUMN "localizacao";

-- AlterTable
ALTER TABLE "Evento" DROP COLUMN "localizacao",
ADD COLUMN     "localizacao_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Infracao" DROP COLUMN "latitude",
DROP COLUMN "longitude";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "createdBy",
ADD COLUMN     "adminId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "bairro",
DROP COLUMN "cep",
DROP COLUMN "cidade",
DROP COLUMN "complemento",
DROP COLUMN "estado",
DROP COLUMN "localizacao",
DROP COLUMN "logradouro",
DROP COLUMN "numero";

-- CreateTable
CREATE TABLE "ReadFor" (
    "id" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReadFor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Localization" (
    "id" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "logradouro" TEXT,
    "numero" TEXT,
    "complemento" TEXT,
    "bairro" TEXT,
    "cidade" TEXT,
    "estado" TEXT,
    "cep" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "usuarioId" TEXT,
    "ambulanteId" TEXT,
    "denunciasId" TEXT,
    "infracaoId" TEXT,

    CONSTRAINT "Localization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivitieLogs" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "adminType" "AdminType" NOT NULL,
    "action" TEXT NOT NULL,
    "affectedTable" TEXT,
    "affectedRecordId" TEXT,
    "affectedTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "details" TEXT,

    CONSTRAINT "ActivitieLogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReadFor_id_key" ON "ReadFor"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Localization_id_key" ON "Localization"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ActivitieLogs_id_key" ON "ActivitieLogs"("id");

-- AddForeignKey
ALTER TABLE "Ambulante" ADD CONSTRAINT "Ambulante_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Denuncias" ADD CONSTRAINT "Denuncias_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComentarioDeDenuncias" ADD CONSTRAINT "ComentarioDeDenuncias_fiscal_id_fkey" FOREIGN KEY ("fiscal_id") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_localizacao_id_fkey" FOREIGN KEY ("localizacao_id") REFERENCES "Localization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Infracao" ADD CONSTRAINT "Infracao_administrador_id_fkey" FOREIGN KEY ("administrador_id") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Infracao" ADD CONSTRAINT "Infracao_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadFor" ADD CONSTRAINT "ReadFor_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadFor" ADD CONSTRAINT "ReadFor_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Localization" ADD CONSTRAINT "Localization_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Localization" ADD CONSTRAINT "Localization_ambulanteId_fkey" FOREIGN KEY ("ambulanteId") REFERENCES "Ambulante"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Localization" ADD CONSTRAINT "Localization_denunciasId_fkey" FOREIGN KEY ("denunciasId") REFERENCES "Denuncias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Localization" ADD CONSTRAINT "Localization_infracaoId_fkey" FOREIGN KEY ("infracaoId") REFERENCES "Infracao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivitieLogs" ADD CONSTRAINT "ActivitieLogs_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
