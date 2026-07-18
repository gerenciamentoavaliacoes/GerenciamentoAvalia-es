import { NextRequest, NextResponse } from "next/server";
import { alunoService } from "@/server/services/aluno.service";
import { autenticarRequisicao } from "@/server/middlewares/auth.middleware";

export async function listarAlunosController(req: NextRequest, turmaId: string) {
  const auth = autenticarRequisicao(req);
  if (!auth.autenticado) return auth.resposta;

  const alunos = await alunoService.listarPorTurma(turmaId);
  return NextResponse.json(alunos);
}

export async function matricularAlunoController(req: NextRequest, turmaId: string) {
  const auth = autenticarRequisicao(req);
  if (!auth.autenticado) return auth.resposta;

  const { nome, matricula, email } = await req.json();
  const registro = await alunoService.matricular({ turmaId, nome, matricula, email });
  return NextResponse.json(registro, { status: 201 });
}

export async function removerAlunoController(req: NextRequest, turmaId: string, alunoId: string) {
  const auth = autenticarRequisicao(req);
  if (!auth.autenticado) return auth.resposta;

  await alunoService.remover(turmaId, alunoId);
  return NextResponse.json({ sucesso: true });
}
