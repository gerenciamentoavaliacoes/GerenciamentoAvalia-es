import { prisma } from "@/server/lib/prisma";

export const avaliacaoRepository = {
  listarPorTurma(turmaId: string) {
    return prisma.avaliacao.findMany({ where: { turmaId } });
  },

  buscarPorId(id: string) {
    return prisma.avaliacao.findUnique({
      where: { id },
      include: { questoes: true, participantes: { include: { aluno: true } } },
    });
  },

  criar(dados: {
    titulo: string;
    tipo: "PROVA" | "LISTA_EXERCICIOS";
    dataInicio: Date;
    dataTermino: Date;
    ordemAleatoria: boolean;
    turmaId: string;
    questoesIds: string[];
    alunosIds: string[];
  }) {
    return prisma.avaliacao.create({
      data: {
        titulo: dados.titulo,
        tipo: dados.tipo,
        dataInicio: dados.dataInicio,
        dataTermino: dados.dataTermino,
        ordemAleatoria: dados.ordemAleatoria,
        turmaId: dados.turmaId,
        questoes: { connect: dados.questoesIds.map((id) => ({ id })) },
        participantes: { create: dados.alunosIds.map((alunoId) => ({ alunoId })) },
      },
    });
  },
};
