/*
  Warnings:

  - You are about to drop the `Infracoes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Infracoes";

-- CreateTable
CREATE TABLE "Infracao" (
    "id" TEXT NOT NULL,
    "administrador_id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "ponto_de_referencia" TEXT NOT NULL,
    "tipo_da_infracao" TEXT[],
    "observacoes" TEXT NOT NULL,
    "id_tipo_providencia" TEXT NOT NULL,
    "multa" DOUBLE PRECISION NOT NULL,
    "prazo" TIMESTAMP(3) NOT NULL,
    "assinatura" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "imagens" TEXT[],
    "providencias" TEXT NOT NULL,
    "assinatura_digitital" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Infracao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Infracao_id_key" ON "Infracao"("id");

-- AddForeignKey
ALTER TABLE "Infracao" ADD CONSTRAINT "Infracao_administrador_id_fkey" FOREIGN KEY ("administrador_id") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Infracao" ADD CONSTRAINT "Infracao_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
