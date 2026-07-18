"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, ClipboardCheck, LogIn, Mail, ShieldCheck, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Logo, LogoMark } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Field";

const DESTAQUES = [
  { icon: ClipboardCheck, texto: "Bancos de questões organizados por disciplina" },
  { icon: Users, texto: "Turmas, matrículas e alunos em um só lugar" },
  { icon: ShieldCheck, texto: "Acesso protegido com autenticação JWT" },
];

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setEnviando(true);

    const resultado = await login(email, senha);

    setEnviando(false);
    if (resultado.ok) {
      router.push("/");
    } else {
      setErro(resultado.erro ?? "Não foi possível entrar");
    }
  }

  return (
    <main className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <section className="relative hidden overflow-hidden bg-brand-gradient lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="pointer-events-none absolute inset-0 opacity-[0.15]">
          <div className="absolute -left-16 -top-16 h-72 w-72 rounded-full border-[3px] border-white" />
          <div className="absolute right-10 top-1/3 h-40 w-40 rounded-full border-[3px] border-white" />
          <div className="absolute bottom-0 left-1/4 h-56 w-56 rounded-full border-[3px] border-white" />
        </div>

        <div className="relative flex items-center gap-2.5">
          <LogoMark size={40} />
          <span className="text-xl font-bold text-white">Avalia+</span>
        </div>

        <div className="relative max-w-md">
          <h1 className="text-3xl font-bold leading-tight text-white">
            Gerencie provas e listas de exercícios sem complicação.
          </h1>
          <p className="mt-3 text-sm text-brand-100">
            Uma plataforma para professores organizarem bancos de questões, turmas e
            avaliações — do rascunho à aplicação.
          </p>

          <ul className="mt-8 space-y-4">
            {DESTAQUES.map(({ icon: Icon, texto }) => (
              <li key={texto} className="flex items-center gap-3 text-sm text-white">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15">
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </span>
                {texto}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-brand-100/80">
          Universidade Estadual da Paraíba · Programação Web 2026.1
        </p>
      </section>

      <section className="flex items-center justify-center bg-slate-50 p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Logo size={40} />
          </div>

          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-600">
            Bem-vindo de volta
          </p>
          <h2 className="mb-8 text-2xl font-bold text-slate-900">Entrar na plataforma</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="professor@instituicao.edu.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                type="password"
                required
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            {erro && (
              <div className="flex items-center gap-2 rounded-lg bg-rose-50 px-3.5 py-2.5 text-sm text-rose-600">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {erro}
              </div>
            )}

            <Button type="submit" size="lg" loading={enviando} icon={<LogIn />} className="w-full">
              {enviando ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
