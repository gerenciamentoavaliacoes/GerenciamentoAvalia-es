import { prisma } from "@/server/lib/prisma";

export const dashboardService = {
  async obterResumo(professorId: string) {
    const [totalAlunos, totalAvaliacoes, turmasRecentes] = await Promise.all([
      prisma.matricula.count({ where: { turma: { professorId } } }),
      prisma.avaliacao.count({ where: { turma: { professorId } } }),
      prisma.turma.findMany({
        where: { professorId },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

    return { totalAlunos, totalAvaliacoes, turmasRecentes };
  },
};
