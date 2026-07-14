import { avaliacaoRepository } from "@/server/repositories/avaliacao.repository";
import { embaralhar } from "@/utils/shuffle";

export const avaliacaoService = {
  listarPorTurma: avaliacaoRepository.listarPorTurma,
  criar: avaliacaoRepository.criar,

  async montarParaAluno(avaliacaoId: string, seed: number) {
    const avaliacao = await avaliacaoRepository.buscarPorId(avaliacaoId);
    if (!avaliacao) throw new Error("Avaliação não encontrada");

    const questoes = avaliacao.ordemAleatoria
      ? embaralhar(avaliacao.questoes, seed)
      : avaliacao.questoes;

    return { ...avaliacao, questoes };
  },
};
