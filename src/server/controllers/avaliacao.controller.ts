import { NextRequest, NextResponse } from "next/server";
import { avaliacaoService } from "@/server/services/avaliacao.service";
import { autenticarRequisicao } from "@/server/middlewares/auth.middleware";

export async function listarAvaliacoesController(req: NextRequest, turmaId: string) {
  const auth = autenticarRequisicao(req);
  if (!auth.autenticado) return auth.resposta;

  const avaliacoes = await avaliacaoService.listarPorTurma(turmaId);
  return NextResponse.json(avaliacoes);
}

export async function criarAvaliacaoController(req: NextRequest) {
  const auth = autenticarRequisicao(req);
  if (!auth.autenticado) return auth.resposta;

  const dados = await req.json();
  const avaliacao = await avaliacaoService.criar(dados);
  return NextResponse.json(avaliacao, { status: 201 });
}
