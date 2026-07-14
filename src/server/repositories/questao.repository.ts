import { prisma } from "@/server/lib/prisma";

export const questaoRepository = {
  listarPorBanco(bancoId: string) {
    return prisma.questao.findMany({ where: { bancoId } });
  },

  buscarPorIds(ids: string[]) {
    return prisma.questao.findMany({ where: { id: { in: ids } } });
  },

  criar(dados: {
    bancoId: string;
    tipo: "DISCURSIVA" | "MULTIPLA_ESCOLHA";
    enunciado: string;
    peso: number;
    gabarito: string;
  }) {
    return prisma.questao.create({ data: dados });
  },
};
