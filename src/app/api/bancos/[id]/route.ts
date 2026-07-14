import { NextRequest } from "next/server";
import { buscarBancoController } from "@/server/controllers/banco.controller";

export function GET(req: NextRequest, { params }: { params: { id: string } }) {
  return buscarBancoController(req, params.id);
}
