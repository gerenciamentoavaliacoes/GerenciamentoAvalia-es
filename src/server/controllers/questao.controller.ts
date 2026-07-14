import { NextRequest, NextResponse } from "next/server";
import { questaoService } from "@/server/services/questao.service";

export async function criarQuestaoController(req: NextRequest) {
  const dados = await req.json();
  const questao = await questaoService.criar(dados);
  return NextResponse.json(questao, { status: 201 });
}
