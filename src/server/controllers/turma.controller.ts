import { NextRequest, NextResponse } from "next/server";
import { turmaService } from "@/server/services/turma.service";
import { autenticarRequisicao } from "@/server/middlewares/auth.middleware";

export async function listarTurmasController(req: NextRequest) {
  const auth = autenticarRequisicao(req);
  if (!auth.autenticado) return auth.resposta;

  const turmas = await turmaService.listar(auth.payload.professorId);
  return NextResponse.json(turmas);
}

export async function criarTurmaController(req: NextRequest) {
  const auth = autenticarRequisicao(req);
  if (!auth.autenticado) return auth.resposta;

  const { nome, codigo, periodo } = await req.json();
  const turma = await turmaService.criar({ nome, codigo, periodo, professorId: auth.payload.professorId });
  return NextResponse.json(turma, { status: 201 });
}

export async function buscarTurmaController(_req: NextRequest, id: string) {
  const turma = await turmaService.buscarPorId(id);
  if (!turma) return NextResponse.json({ erro: "Turma não encontrada" }, { status: 404 });
  return NextResponse.json(turma);
}
