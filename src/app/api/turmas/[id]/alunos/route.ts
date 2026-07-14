import { NextRequest } from "next/server";
import { listarAlunosController, matricularAlunoController } from "@/server/controllers/aluno.controller";

export function GET(req: NextRequest, { params }: { params: { id: string } }) {
  return listarAlunosController(req, params.id);
}

export function POST(req: NextRequest, { params }: { params: { id: string } }) {
  return matricularAlunoController(req, params.id);
}
