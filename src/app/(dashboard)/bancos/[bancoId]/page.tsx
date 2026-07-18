"use client";

import Link from "next/link";
import { ArrowLeft, FileQuestion, Plus } from "lucide-react";
import { useBanco } from "@/hooks/useBanco";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

const TIPO_INFO = {
  DISCURSIVA: { rotulo: "Discursiva", tone: "brand" as const },
  MULTIPLA_ESCOLHA: { rotulo: "Múltipla escolha", tone: "emerald" as const },
};

export default function BancoEspecificoPage({ params }: { params: { bancoId: string } }) {
  const { banco, carregando } = useBanco(params.bancoId);

  return (
    <section>
      <Link
        href="/bancos"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700"
      >
        <ArrowLeft className="h-4 w-4" /> Banco de Questões
      </Link>

      <PageHeader
        title={carregando ? "Carregando..." : banco?.nome ?? ""}
        description={
          banco ? `${banco.questoes.length} questão(ões) cadastrada(s)` : undefined
        }
        action={
          <Link href={`/bancos/${params.bancoId}/questoes/novo`}>
            <Button icon={<Plus />}>Nova questão</Button>
          </Link>
        }
      />

      {!carregando && banco && (
        <div className="space-y-3">
          {banco.questoes.length ? (
            banco.questoes.map((questao) => {
              const info = TIPO_INFO[questao.tipo];
              return (
                <Card key={questao.id}>
                  <CardBody className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
                      <FileQuestion className="h-4.5 w-4.5" style={{ height: 18, width: 18 }} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex items-center gap-2">
                        <Badge tone={info.tone}>{info.rotulo}</Badge>
                        <span className="text-xs text-slate-400">Peso {questao.peso}</span>
                      </div>
                      <p className="text-sm text-slate-800">{questao.enunciado}</p>
                    </div>
                  </CardBody>
                </Card>
              );
            })
          ) : (
            <EmptyState
              icon={FileQuestion}
              title="Nenhuma questão cadastrada neste banco"
              description="Adicione questões discursivas ou de múltipla escolha para usar nas avaliações."
              action={
                <Link href={`/bancos/${params.bancoId}/questoes/novo`}>
                  <Button size="sm" icon={<Plus />}>
                    Nova questão
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
