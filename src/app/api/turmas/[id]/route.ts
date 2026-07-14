import { NextRequest } from "next/server";
import { buscarTurmaController } from "@/server/controllers/turma.controller";

export function GET(req: NextRequest, { params }: { params: { id: string } }) {
  return buscarTurmaController(req, params.id);
}
