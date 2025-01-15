-- DropForeignKey
ALTER TABLE "Permissoes" DROP CONSTRAINT "Permissoes_adminId_fkey";

-- AddForeignKey
ALTER TABLE "Permissoes" ADD CONSTRAINT "Permissoes_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
