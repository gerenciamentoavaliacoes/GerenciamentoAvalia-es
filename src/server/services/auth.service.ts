import { professorRepository } from "@/server/repositories/professor.repository";
import { compararSenha } from "@/server/lib/bcrypt";
import { signToken } from "@/server/lib/jwt";

export const authService = {
  async login(email: string, senha: string) {
    const professor = await professorRepository.buscarPorEmail(email);
    if (!professor) throw new Error("Credenciais inválidas");

    const senhaValida = await compararSenha(senha, professor.senhaHash);
    if (!senhaValida) throw new Error("Credenciais inválidas");

    return signToken({ professorId: professor.id, email: professor.email });
  },
};
