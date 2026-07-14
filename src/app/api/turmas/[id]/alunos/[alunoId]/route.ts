import { NextRequest } from "next/server";
import { removerAlunoController } from "@/server/controllers/aluno.controller";

export function DELETE(req: NextRequest, { params }: { params: { id: string; alunoId: string } }) {
  return removerAlunoController(req, params.id, params.alunoId);
}
