import { NextRequest, NextResponse } from "next/server";
import { questaoService } from "@/server/services/questao.service";
import { autenticarRequisicao } from "@/server/middlewares/auth.middleware";

export async function criarQuestaoController(req: NextRequest) {
  const auth = autenticarRequisicao(req);
  if (!auth.autenticado) return auth.resposta;

  const dados = await req.json();
  const questao = await questaoService.criar(dados);
  return NextResponse.json(questao, { status: 201 });
}
