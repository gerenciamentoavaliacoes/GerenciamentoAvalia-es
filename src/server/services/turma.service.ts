import { turmaRepository } from "@/server/repositories/turma.repository";

export const turmaService = {
  listar: turmaRepository.listarPorProfessor,
  buscarPorId: turmaRepository.buscarPorId,
  criar: turmaRepository.criar,
};
