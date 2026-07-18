"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Trash2, UserPlus, Users } from "lucide-react";
import { useTurma } from "@/hooks/useTurma";
import { apiFetch } from "@/utils/api";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardBody, CardSection } from "@/components/ui/Card";
import { Input, Label } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export default function GerenciarAlunosPage({ params }: { params: { turmaId: string } }) {
  const { turma, carregando, recarregar } = useTurma(params.turmaId);

  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [email, setEmail] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [removendoId, setRemovendoId] = useState<string | null>(null);

  async function handleAdicionar(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);

    await apiFetch(`/api/turmas/${params.turmaId}/alunos`, {
      method: "POST",
      body: JSON.stringify({ nome, matricula, email }),
    });

    setNome("");
    setMatricula("");
    setEmail("");
    setEnviando(false);
    recarregar();
  }

  async function handleRemover(alunoId: string) {
    setRemovendoId(alunoId);
    await apiFetch(`/api/turmas/${params.turmaId}/alunos/${alunoId}`, {
      method: "DELETE",
    });
    await recarregar();
    setRemovendoId(null);
  }

  return (
    <section>
      <Link
        href={`/turmas/${params.turmaId}`}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700"
      >
        <ArrowLeft className="h-4 w-4" /> {carregando ? "Turma" : turma?.nome}
      </Link>

      <PageHeader
        eyebrow="Módulo 3"
        title="Gerenciar Alunos"
        description="Adicione ou remova estudantes matriculados nesta turma."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {carregando ? (
            <div className="space-y-3">
              {[0, 1].map((i) => (
                <Card key={i} className="h-16 animate-pulse bg-slate-100" />
              ))}
            </div>
          ) : turma?.matriculas.length ? (
            <div className="space-y-3">
              {turma.matriculas.map(({ aluno }) => (
                <Card key={aluno.id}>
                  <CardBody className="flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-semibold text-brand-600">
                        {aluno.nome.charAt(0).toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-slate-900">{aluno.nome}</p>
                        <p className="truncate text-sm text-slate-500">
                          {aluno.matricula} · {aluno.email}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="danger"
                      size="sm"
                      icon={<Trash2 />}
                      loading={removendoId === aluno.id}
                      onClick={() => handleRemover(aluno.id)}
                    >
                      Remover
                    </Button>
                  </CardBody>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Users}
              title="Nenhum aluno matriculado nesta turma"
              description="Use o formulário ao lado para adicionar o primeiro aluno."
            />
          )}
        </div>

        <div className="h-fit">
          <CardSection title="Adicionar aluno">
            <form onSubmit={handleAdicionar} className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="matricula">Matrícula</Label>
                <Input
                  id="matricula"
                  required
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Button type="submit" loading={enviando} icon={<UserPlus />} className="w-full">
                {enviando ? "Adicionando..." : "Adicionar"}
              </Button>
            </form>
          </CardSection>
        </div>
      </div>
    </section>
  );
}
