-- CreateTable
CREATE TABLE "Infracoes" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "tipo" TEXT[],
    "localuiacao" TEXT NOT NULL,
    "fotos" TEXT[],
    "providencias" TEXT NOT NULL,
    "assinatura_digitital" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Infracoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Infracoes_id_key" ON "Infracoes"("id");
