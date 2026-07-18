"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, ClipboardList, Plus, Shuffle, Users } from "lucide-react";
import { useTurma } from "@/hooks/useTurma";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

const TIPO_INFO = {
  PROVA: { rotulo: "Prova", tone: "brand" as const },
  LISTA_EXERCICIOS: { rotulo: "Lista de Exercícios", tone: "amber" as const },
};

export default function TurmaEspecificaPage({ params }: { params: { turmaId: string } }) {
  const { turma, carregando } = useTurma(params.turmaId);

  return (
    <section>
      <Link
        href="/turmas"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700"
      >
        <ArrowLeft className="h-4 w-4" /> Minhas Turmas
      </Link>

      <PageHeader
        title={carregando ? "Carregando..." : turma?.nome ?? ""}
        description={
          turma ? `${turma.codigo} · ${turma.periodo} · ${turma.matriculas.length} aluno(s)` : undefined
        }
        action={
          <>
            <Link href={`/turmas/${params.turmaId}/alunos`}>
              <Button variant="outline" icon={<Users />}>
                Gerenciar Alunos
              </Button>
            </Link>
            <Link href={`/turmas/${params.turmaId}/avaliacoes/nova`}>
              <Button icon={<Plus />}>Criar Nova Avaliação</Button>
            </Link>
          </>
        }
      />

      {!carregando && turma && (
        <div className="space-y-3">
          {turma.avaliacoes.length ? (
            turma.avaliacoes.map((avaliacao) => {
              const info = TIPO_INFO[avaliacao.tipo];
              return (
                <Card key={avaliacao.id}>
                  <CardBody className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
                        <ClipboardList className="h-5 w-5" strokeWidth={2} />
                      </span>
                      <div>
                        <p className="font-medium text-slate-900">{avaliacao.titulo}</p>
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          <Badge tone={info.tone}>{info.rotulo}</Badge>
                          <span className="flex items-center gap-1 text-xs text-slate-400">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(avaliacao.dataInicio).toLocaleString("pt-BR")}
                          </span>
                          {avaliacao.ordemAleatoria && (
                            <span className="flex items-center gap-1 text-xs text-slate-400">
                              <Shuffle className="h-3.5 w-3.5" /> ordem aleatória
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              );
            })
          ) : (
            <EmptyState
              icon={ClipboardList}
              title="Nenhuma avaliação criada nesta turma"
              description="Monte uma prova ou lista de exercícios puxando questões dos seus bancos."
              action={
                <Link href={`/turmas/${params.turmaId}/avaliacoes/nova`}>
                  <Button size="sm" icon={<Plus />}>
                    Criar Nova Avaliação
                  </Button>
                </Link>
              }
            />
          )}
        </div>
      )}
    </section>
  );
}
