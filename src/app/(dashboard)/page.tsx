"use client";

import Link from "next/link";
import { ArrowRight, ClipboardList, GraduationCap, Layers } from "lucide-react";
import { useDashboard } from "@/hooks/useDashboard";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";

const STATS = [
  {
    key: "totalAlunos" as const,
    label: "Total de alunos ativos",
    icon: GraduationCap,
    tone: "bg-brand-50 text-brand-600",
  },
  {
    key: "totalAvaliacoes" as const,
    label: "Total de avaliações criadas",
    icon: ClipboardList,
    tone: "bg-emerald-50 text-emerald-600",
  },
];

export default function HomePage() {
  const { resumo, carregando } = useDashboard();

  return (
    <section>
      <PageHeader
        eyebrow="Visão geral"
        title="Dashboard"
        description="Acompanhe o panorama das suas turmas e avaliações."
      />

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {STATS.map(({ key, label, icon: Icon, tone }) => (
          <Card key={key}>
            <CardBody className="flex items-center gap-4">
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tone}`}>
                <Icon className="h-6 w-6" strokeWidth={2} />
              </span>
              <div>
                <p className="text-sm text-slate-500">{label}</p>
                <p className="text-3xl font-bold tracking-tight text-slate-900">
                  {carregando ? "—" : resumo?.[key] ?? 0}
                </p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="mb-4 flex items-center gap-2">
        <Layers className="h-4 w-4 text-slate-400" />
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Turmas recentes
        </h2>
      </div>

      {carregando ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Card key={i} className="h-[86px] animate-pulse bg-slate-100" />
          ))}
        </div>
      ) : resumo?.turmasRecentes?.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resumo.turmasRecentes.map((turma) => (
            <Link key={turma.id} href={`/turmas/${turma.id}`} className="group">
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardBody className="flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-slate-900">{turma.nome}</p>
                    <p className="text-sm text-slate-500">
                      {turma.codigo} · {turma.periodo}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-500" />
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={GraduationCap}
          title="Nenhuma turma criada ainda"
          description="Crie sua primeira turma para começar a organizar alunos e avaliações."
          action={
            <Link
              href="/turmas/nova"
              className="text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              Criar turma →
            </Link>
          }
        />
      )}
    </section>
  );
}
