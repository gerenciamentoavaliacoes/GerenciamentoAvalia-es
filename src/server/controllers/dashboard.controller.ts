import { NextRequest, NextResponse } from "next/server";
import { dashboardService } from "@/server/services/dashboard.service";
import { autenticarRequisicao } from "@/server/middlewares/auth.middleware";

export async function obterResumoController(req: NextRequest) {
  const auth = autenticarRequisicao(req);
  if (!auth.autenticado) return auth.resposta;

  const resumo = await dashboardService.obterResumo(auth.payload.professorId);
  return NextResponse.json(resumo);
}
