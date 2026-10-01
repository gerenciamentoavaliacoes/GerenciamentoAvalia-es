-- AlterTable
ALTER TABLE "Questao" ADD COLUMN     "alternativas" TEXT[] DEFAULT ARRAY[]::TEXT[];
