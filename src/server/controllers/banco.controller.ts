import { NextRequest, NextResponse } from "next/server";
import { bancoService } from "@/server/services/banco.service";
import { autenticarRequisicao } from "@/server/middlewares/auth.middleware";

export async function listarBancosController(req: NextRequest) {
  const auth = autenticarRequisicao(req);
  if (!auth.autenticado) return auth.resposta;

  const bancos = await bancoService.listar(auth.payload.professorId);
  return NextResponse.json(bancos);
}

export async function criarBancoController(req: NextRequest) {
  const auth = autenticarRequisicao(req);
  if (!auth.autenticado) return auth.resposta;

  const { nome } = await req.json();
  const banco = await bancoService.criar({ nome, professorId: auth.payload.professorId });
  return NextResponse.json(banco, { status: 201 });
}

export async function buscarBancoController(req: NextRequest, id: string) {
  const auth = autenticarRequisicao(req);
  if (!auth.autenticado) return auth.resposta;

  const banco = await bancoService.buscarPorId(id);
  if (!banco) return NextResponse.json({ erro: "Banco não encontrado" }, { status: 404 });
  return NextResponse.json(banco);
}
