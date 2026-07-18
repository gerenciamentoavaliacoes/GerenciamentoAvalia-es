"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useBancos } from "@/hooks/useBancos";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { Input, Label } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export default function NovoBancoPage() {
  const { criarBanco } = useBancos();
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    const { ok, banco } = await criarBanco(nome);
    setEnviando(false);
    if (ok) router.push(`/bancos/${banco.id}`);
  }

  return (
    <section className="max-w-lg">
      <Link
        href="/bancos"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700"
      >
        <ArrowLeft className="h-4 w-4" /> Banco de Questões
      </Link>

      <PageHeader title="Novo Banco de Questões" />

      <Card>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="nome">Nome do banco</Label>
              <div className="relative">
                <BookOpen className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="nome"
                  required
                  placeholder="Ex: Estruturas de Dados"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Button type="submit" loading={enviando}>
              {enviando ? "Criando..." : "Criar banco"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </section>
  );
}
