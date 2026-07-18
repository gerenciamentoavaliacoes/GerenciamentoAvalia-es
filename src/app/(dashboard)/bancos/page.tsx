"use client";

import Link from "next/link";
import { BookOpen, ChevronRight, FolderOpen, Plus } from "lucide-react";
import { useBancos } from "@/hooks/useBancos";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export default function BancosPage() {
  const { bancos, carregando } = useBancos();

  return (
    <section>
      <PageHeader
        eyebrow="Módulo 2"
        title="Banco de Questões"
        description="Organize o acervo de perguntas do professor por assunto ou disciplina."
        action={
          <Link href="/bancos/novo">
            <Button icon={<Plus />}>Novo banco</Button>
          </Link>
        }
      />

      {carregando ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Card key={i} className="h-24 animate-pulse bg-slate-100" />
          ))}
        </div>
      ) : bancos.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bancos.map((banco) => (
            <Link key={banco.id} href={`/bancos/${banco.id}`} className="group">
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardBody className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <BookOpen className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-slate-900">{banco.nome}</p>
                    <p className="text-sm text-slate-500">
                      {banco._count?.questoes ?? 0} questão(ões)
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-500" />
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={FolderOpen}
          title="Nenhum banco de questões criado ainda"
          description="Crie um banco para começar a cadastrar questões discursivas e de múltipla escolha."
          action={
            <Link href="/bancos/novo">
              <Button size="sm" icon={<Plus />}>
                Criar banco
              </Button>
            </Link>
          }
        />
      )}
    </section>
  );
}
