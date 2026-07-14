import { NextRequest, NextResponse } from "next/server";
import { avaliacaoService } from "@/server/services/avaliacao.service";

export async function listarAvaliacoesController(_req: NextRequest, turmaId: string) {
  const avaliacoes = await avaliacaoService.listarPorTurma(turmaId);
  return NextResponse.json(avaliacoes);
}

export async function criarAvaliacaoController(req: NextRequest) {
  const dados = await req.json();
  const avaliacao = await avaliacaoService.criar(dados);
  return NextResponse.json(avaliacao, { status: 201 });
}
