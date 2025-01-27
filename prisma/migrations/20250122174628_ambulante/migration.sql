-- CreateTable
CREATE TABLE "Ambulante" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT,
    "descricao" TEXT NOT NULL,
    "status" "StatusDeVerificacao" NOT NULL,
    "nome_do_negoocio" TEXT NOT NULL,
    "tipo_do_negocio" TEXT NOT NULL,
    "descricao_do_negocio" TEXT NOT NULL,
    "localizacao_do__negocio" TEXT NOT NULL,
    "fotos_do_negocio" TEXT[],
    "documentacao" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ambulante_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ambulante" ADD CONSTRAINT "Ambulante_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
