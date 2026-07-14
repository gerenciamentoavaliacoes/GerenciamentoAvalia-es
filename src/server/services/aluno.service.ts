import { alunoRepository } from "@/server/repositories/aluno.repository";

export const alunoService = {
  listarPorTurma: alunoRepository.listarPorTurma,
  matricular: alunoRepository.matricular,
  remover: alunoRepository.remover,
};
