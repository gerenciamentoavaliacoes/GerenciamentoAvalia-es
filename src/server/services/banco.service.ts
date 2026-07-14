import { bancoRepository } from "@/server/repositories/banco.repository";

export const bancoService = {
  listar: bancoRepository.listarPorProfessor,
  buscarPorId: bancoRepository.buscarPorId,
  criar: bancoRepository.criar,
};
