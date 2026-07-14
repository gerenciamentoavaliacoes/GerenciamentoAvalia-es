import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/server/services/auth.service";

export async function loginController(req: NextRequest) {
  const { email, senha } = await req.json();

  try {
    const token = await authService.login(email, senha);
    return NextResponse.json({ token });
  } catch {
    return NextResponse.json({ erro: "Credenciais inválidas" }, { status: 401 });
  }
}
