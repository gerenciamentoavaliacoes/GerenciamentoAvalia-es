"use client";

import Link from "next/link";
import { ChevronRight, ClipboardList, Plus, School, Users } from "lucide-react";
import { useTurmas } from "@/hooks/useTurmas";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export default function TurmasPage() {
  const { turmas, carregando } = useTurmas();

  return (
    <section>
      <PageHeader
        eyebrow="Módulo 3"
        title="Minhas Turmas"
        description="Gerencie turmas, matrículas de alunos e suas avaliações."
        action={
          <Link href="/turmas/nova">
            <Button icon={<Plus />}>Nova turma</Button>
          </Link>
        }
      />

      {carregando ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Card key={i} className="h-28 animate-pulse bg-slate-100" />
          ))}
        </div>
      ) : turmas.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {turmas.map((turma) => (
            <Link key={turma.id} href={`/turmas/${turma.id}`} className="group">
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardBody>
                  <div className="mb-3 flex items-start justify-between">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                      <School className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-500" />
                  </div>
                  <p className="truncate font-medium text-slate-900">{turma.nome}</p>
                  <p className="mb-3 text-sm text-slate-500">
                    {turma.codigo} · {turma.periodo}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" /> {turma._count?.matriculas ?? 0} alunos
                    </span>
                    <span className="flex items-center gap-1">
                      <ClipboardList className="h-3.5 w-3.5" />{" "}
                      {turma._count?.avaliacoes ?? 0} avaliações
                    </span>
                  </div>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={School}
          title="Nenhuma turma criada ainda"
          description="Crie uma turma para começar a matricular alunos e montar avaliações."
          action={
            <Link href="/turmas/nova">
              <Button size="sm" icon={<Plus />}>
                Criar turma
              </Button>
            </Link>
          }
        />
      )}
    </section>
  );
}
