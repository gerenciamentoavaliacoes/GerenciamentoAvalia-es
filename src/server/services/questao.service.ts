import { questaoRepository } from "@/server/repositories/questao.repository";

export const questaoService = {
  listarPorBanco: questaoRepository.listarPorBanco,
  criar: questaoRepository.criar,
};
