import { prisma } from "@/server/lib/prisma";

export const bancoRepository = {
  listarPorProfessor(professorId: string) {
    return prisma.bancoQuestoes.findMany({
      where: { professorId },
      include: { _count: { select: { questoes: true } } },
      orderBy: { createdAt: "desc" },
    });
  },

  buscarPorId(id: string) {
    return prisma.bancoQuestoes.findUnique({ where: { id }, include: { questoes: true } });
  },

  criar(dados: { nome: string; professorId: string }) {
    return prisma.bancoQuestoes.create({ data: dados });
  },
};
