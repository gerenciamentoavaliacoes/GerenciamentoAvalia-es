import { prisma } from "@/server/lib/prisma";

export const turmaRepository = {
  listarPorProfessor(professorId: string) {
    return prisma.turma.findMany({ where: { professorId } });
  },

  buscarPorId(id: string) {
    return prisma.turma.findUnique({
      where: { id },
      include: { avaliacoes: true, matriculas: { include: { aluno: true } } },
    });
  },

  criar(dados: { nome: string; codigo: string; periodo: string; professorId: string }) {
    return prisma.turma.create({ data: dados });
  },
};
