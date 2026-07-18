"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Hash, School } from "lucide-react";
import { useTurmas } from "@/hooks/useTurmas";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { Input, Label } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export default function NovaTurmaPage() {
  const { criarTurma } = useTurmas();
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    const { ok, turma } = await criarTurma({ nome, codigo, periodo });
    setEnviando(false);
    if (ok) router.push(`/turmas/${turma.id}`);
  }

  return (
    <section className="max-w-lg">
      <Link
        href="/turmas"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700"
      >
        <ArrowLeft className="h-4 w-4" /> Minhas Turmas
      </Link>

      <PageHeader title="Criar Nova Turma" />

      <Card>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="nome">Nome da turma</Label>
              <div className="relative">
                <School className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="nome"
                  required
                  placeholder="Ex: Programação Web"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="codigo">Código da disciplina/turma</Label>
              <div className="relative">
                <Hash className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="codigo"
                  required
                  placeholder="Ex: CCT-101"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="periodo">Semestre/Período letivo</Label>
              <div className="relative">
                <Calendar className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="periodo"
                  required
                  placeholder="2026.1"
                  value={periodo}
                  onChange={(e) => setPeriodo(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Button type="submit" loading={enviando}>
              {enviando ? "Criando..." : "Criar turma"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </section>
  );
}
