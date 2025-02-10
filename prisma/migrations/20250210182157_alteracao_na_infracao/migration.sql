/*
  Warnings:

  - The `tipo_da_infracao` column on the `Infracao` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `id_tipo_providencia` column on the `Infracao` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Infracao" DROP COLUMN "tipo_da_infracao",
ADD COLUMN     "tipo_da_infracao" INTEGER[],
DROP COLUMN "id_tipo_providencia",
ADD COLUMN     "id_tipo_providencia" INTEGER[];
