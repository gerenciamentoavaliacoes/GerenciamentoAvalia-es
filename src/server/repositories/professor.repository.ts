import { prisma } from "@/server/lib/prisma";

export const professorRepository = {
  buscarPorEmail(email: string) {
    return prisma.professor.findUnique({ where: { email } });
  },
};
