-- CreateEnum
CREATE TYPE "TipoQuestao" AS ENUM ('DISCURSIVA', 'MULTIPLA_ESCOLHA');

-- CreateEnum
CREATE TYPE "TipoAvaliacao" AS ENUM ('PROVA', 'LISTA_EXERCICIOS');

-- CreateTable
CREATE TABLE "Professor" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Turma" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "periodo" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Turma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aluno" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Matricula" (
    "id" TEXT NOT NULL,
    "turmaId" TEXT NOT NULL,
    "alunoId" TEXT NOT NULL,

    CONSTRAINT "Matricula_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BancoQuestoes" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BancoQuestoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questao" (
    "id" TEXT NOT NULL,
    "bancoId" TEXT NOT NULL,
    "tipo" "TipoQuestao" NOT NULL,
    "enunciado" TEXT NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,
    "gabarito" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Questao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Avaliacao" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "tipo" "TipoAvaliacao" NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataTermino" TIMESTAMP(3) NOT NULL,
    "ordemAleatoria" BOOLEAN NOT NULL DEFAULT false,
    "turmaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Avaliacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipanteAvaliacao" (
    "id" TEXT NOT NULL,
    "avaliacaoId" TEXT NOT NULL,
    "alunoId" TEXT NOT NULL,

    CONSTRAINT "ParticipanteAvaliacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AvaliacaoQuestoes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Professor_email_key" ON "Professor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_matricula_key" ON "Aluno"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "Matricula_turmaId_alunoId_key" ON "Matricula"("turmaId", "alunoId");

-- CreateIndex
CREATE UNIQUE INDEX "ParticipanteAvaliacao_avaliacaoId_alunoId_key" ON "ParticipanteAvaliacao"("avaliacaoId", "alunoId");

-- CreateIndex
CREATE UNIQUE INDEX "_AvaliacaoQuestoes_AB_unique" ON "_AvaliacaoQuestoes"("A", "B");

-- CreateIndex
CREATE INDEX "_AvaliacaoQuestoes_B_index" ON "_AvaliacaoQuestoes"("B");

-- AddForeignKey
ALTER TABLE "Turma" ADD CONSTRAINT "Turma_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matricula" ADD CONSTRAINT "Matricula_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matricula" ADD CONSTRAINT "Matricula_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BancoQuestoes" ADD CONSTRAINT "BancoQuestoes_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questao" ADD CONSTRAINT "Questao_bancoId_fkey" FOREIGN KEY ("bancoId") REFERENCES "BancoQuestoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipanteAvaliacao" ADD CONSTRAINT "ParticipanteAvaliacao_avaliacaoId_fkey" FOREIGN KEY ("avaliacaoId") REFERENCES "Avaliacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipanteAvaliacao" ADD CONSTRAINT "ParticipanteAvaliacao_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AvaliacaoQuestoes" ADD CONSTRAINT "_AvaliacaoQuestoes_A_fkey" FOREIGN KEY ("A") REFERENCES "Avaliacao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AvaliacaoQuestoes" ADD CONSTRAINT "_AvaliacaoQuestoes_B_fkey" FOREIGN KEY ("B") REFERENCES "Questao"("id") ON DELETE CASCADE ON UPDATE CASCADE;
