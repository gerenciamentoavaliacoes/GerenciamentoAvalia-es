import { NextRequest } from "next/server";
import { listarAvaliacoesController } from "@/server/controllers/avaliacao.controller";

export function GET(req: NextRequest, { params }: { params: { id: string } }) {
  return listarAvaliacoesController(req, params.id);
}
