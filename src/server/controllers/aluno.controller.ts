import { NextRequest, NextResponse } from "next/server";
import { alunoService } from "@/server/services/aluno.service";

export async function listarAlunosController(_req: NextRequest, turmaId: string) {
  const alunos = await alunoService.listarPorTurma(turmaId);
  return NextResponse.json(alunos);
}

export async function matricularAlunoController(req: NextRequest, turmaId: string) {
  const { nome, matricula, email } = await req.json();
  const registro = await alunoService.matricular({ turmaId, nome, matricula, email });
  return NextResponse.json(registro, { status: 201 });
}

export async function removerAlunoController(_req: NextRequest, turmaId: string, alunoId: string) {
  await alunoService.remover(turmaId, alunoId);
  return NextResponse.json({ sucesso: true });
}
