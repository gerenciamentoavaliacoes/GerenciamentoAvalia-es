import { prisma } from "@/server/lib/prisma";

export const alunoRepository = {
  listarPorTurma(turmaId: string) {
    return prisma.matricula.findMany({ where: { turmaId }, include: { aluno: true } });
  },

  matricular(dados: { turmaId: string; nome: string; matricula: string; email: string }) {
    return prisma.aluno.upsert({
      where: { matricula: dados.matricula },
      update: {},
      create: { nome: dados.nome, matricula: dados.matricula, email: dados.email },
    }).then((aluno) =>
      prisma.matricula.create({ data: { turmaId: dados.turmaId, alunoId: aluno.id } })
    );
  },

  remover(turmaId: string, alunoId: string) {
    return prisma.matricula.delete({ where: { turmaId_alunoId: { turmaId, alunoId } } });
  },
};
