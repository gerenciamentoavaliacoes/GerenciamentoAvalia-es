import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/server/lib/jwt";

export function autenticarRequisicao(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return { autenticado: false as const, resposta: NextResponse.json({ erro: "Token ausente" }, { status: 401 }) };
  }

  try {
    const payload = verifyToken(token);
    return { autenticado: true as const, payload };
  } catch {
    return { autenticado: false as const, resposta: NextResponse.json({ erro: "Token inválido" }, { status: 401 }) };
  }
}
