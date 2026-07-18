"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, CalendarClock, ListChecks, Plus, Users, X } from "lucide-react";
import { useTurma } from "@/hooks/useTurma";
import { useBancos } from "@/hooks/useBancos";
import { apiFetch } from "@/utils/api";
import type { Questao, TipoAvaliacao } from "@/types";
import { PageHeader } from "@/components/ui/PageHeader";
import { CardSection } from "@/components/ui/Card";
import { Input, Label, Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";
import { Checkbox } from "@/components/ui/Checkbox";

export default function NovaAvaliacaoPage({ params }: { params: { turmaId: string } }) {
  const { turma } = useTurma(params.turmaId);
  const { bancos } = useBancos();
  const router = useRouter();

  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState<TipoAvaliacao>("PROVA");
  const [dataInicio, setDataInicio] = useState("");
  const [dataTermino, setDataTermino] = useState("");
  const [ordemAleatoria, setOrdemAleatoria] = useState(false);
  const [participantesIds, setParticipantesIds] = useState<string[]>([]);

  const [bancoSelecionado, setBancoSelecionado] = useState("");
  const [questoesDoBanco, setQuestoesDoBanco] = useState<Questao[]>([]);
  const [questoesSelecionadas, setQuestoesSelecionadas] = useState<Questao[]>([]);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (!bancoSelecionado) {
      setQuestoesDoBanco([]);
      return;
    }
    apiFetch(`/api/bancos/${bancoSelecionado}`)
      .then((res) => res.json())
      .then((banco) => setQuestoesDoBanco(banco.questoes ?? []));
  }, [bancoSelecionado]);

  function toggleParticipante(alunoId: string) {
    setParticipantesIds((atual) =>
      atual.includes(alunoId)
        ? atual.filter((id) => id !== alunoId)
        : [...atual, alunoId]
    );
  }

  function adicionarQuestao(questao: Questao) {
    if (questoesSelecionadas.some((q) => q.id === questao.id)) return;
    setQuestoesSelecionadas((atual) => [...atual, questao]);
  }

  function removerQuestao(questaoId: string) {
    setQuestoesSelecionadas((atual) => atual.filter((q) => q.id !== questaoId));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);

    const res = await apiFetch("/api/avaliacoes", {
      method: "POST",
      body: JSON.stringify({
        titulo,
        tipo,
        dataInicio: new Date(dataInicio).toISOString(),
        dataTermino: new Date(dataTermino).toISOString(),
        ordemAleatoria,
        turmaId: params.turmaId,
        questoesIds: questoesSelecionadas.map((q) => q.id),
        alunosIds: participantesIds,
      }),
    });

    setEnviando(false);
    if (res.ok) router.push(`/turmas/${params.turmaId}`);
  }

  const disponiveis = questoesDoBanco.filter(
    (q) => !questoesSelecionadas.some((sel) => sel.id === q.id)
  );

  return (
    <section className="max-w-3xl">
      <Link
        href={`/turmas/${params.turmaId}`}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar à turma
      </Link>

      <PageHeader eyebrow="Módulo 4" title="Nova Avaliação" />

      <form onSubmit={handleSubmit} className="space-y-6">
        <CardSection title="Dados gerais">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="titulo">Título da avaliação</Label>
              <Input
                id="titulo"
                required
                placeholder="Ex: Prova 1 - Estruturas de Dados"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="tipo">Tipo da avaliação</Label>
              <Select
                id="tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value as TipoAvaliacao)}
              >
                <option value="PROVA">Prova</option>
                <option value="LISTA_EXERCICIOS">Lista de Exercícios</option>
              </Select>
            </div>

            <div className="flex items-center rounded-lg border border-slate-100 bg-slate-50 px-4">
              <Switch
                checked={ordemAleatoria}
                onChange={setOrdemAleatoria}
                label="Ordem aleatória"
                description="Senão, a ordem será fixa"
              />
            </div>

            <div>
              <Label htmlFor="inicio">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarClock className="h-3.5 w-3.5" /> Data e horário de início
                </span>
              </Label>
              <Input
                id="inicio"
                type="datetime-local"
                required
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="termino">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarClock className="h-3.5 w-3.5" /> Data e horário de término
                </span>
              </Label>
              <Input
                id="termino"
                type="datetime-local"
                required
                value={dataTermino}
                onChange={(e) => setDataTermino(e.target.value)}
              />
            </div>
          </div>
        </CardSection>

        <CardSection
          title="Participantes"
          description={`${participantesIds.length} de ${turma?.matriculas.length ?? 0} aluno(s) selecionado(s)`}
        >
          {turma?.matriculas.length ? (
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
              {turma.matriculas.map(({ aluno }) => (
                <Checkbox
                  key={aluno.id}
                  checked={participantesIds.includes(aluno.id)}
                  onChange={() => toggleParticipante(aluno.id)}
                  label={aluno.nome}
                />
              ))}
            </div>
          ) : (
            <p className="flex items-center gap-2 text-sm text-slate-400">
              <Users className="h-4 w-4" /> Nenhum aluno matriculado nesta turma ainda.
            </p>
          )}
        </CardSection>

        <CardSection
          title="Montagem de questões"
          description="Puxe questões de um banco e monte a avaliação"
        >
          <Label htmlFor="bancoQuestoes">
            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" /> Banco de questões
            </span>
          </Label>
          <Select
            id="bancoQuestoes"
            value={bancoSelecionado}
            onChange={(e) => setBancoSelecionado(e.target.value)}
            className="mb-4"
          >
            <option value="">Selecione um banco...</option>
            {bancos.map((banco) => (
              <option key={banco.id} value={banco.id}>
                {banco.nome}
              </option>
            ))}
          </Select>

          {disponiveis.length > 0 && (
            <div className="mb-5 space-y-2 rounded-lg border border-slate-100 bg-slate-50/60 p-3">
              {disponiveis.map((questao) => (
                <div
                  key={questao.id}
                  className="flex items-center justify-between gap-3 rounded-lg bg-white p-3 shadow-soft"
                >
                  <p className="text-sm text-slate-700">{questao.enunciado}</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    icon={<Plus />}
                    onClick={() => adicionarQuestao(questao)}
                    className="shrink-0"
                  >
                    Adicionar
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-600">
            <ListChecks className="h-4 w-4" />
            Questões da avaliação ({questoesSelecionadas.length})
          </div>
          <div className="space-y-2">
            {questoesSelecionadas.map((questao, index) => (
              <div
                key={questao.id}
                className="flex items-center justify-between gap-3 rounded-lg bg-brand-50/60 p-3 ring-1 ring-inset ring-brand-100"
              >
                <p className="text-sm text-slate-700">
                  <span className="mr-2 font-semibold text-brand-600">{index + 1}.</span>
                  {questao.enunciado}
                </p>
                <button
                  type="button"
                  onClick={() => removerQuestao(questao.id)}
                  className="shrink-0 rounded-md p-1.5 text-slate-400 hover:bg-white hover:text-rose-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            {!questoesSelecionadas.length && (
              <p className="text-sm text-slate-400">Nenhuma questão adicionada ainda.</p>
            )}
          </div>
        </CardSection>

        <Button
          type="submit"
          size="lg"
          loading={enviando}
          disabled={!questoesSelecionadas.length}
        >
          {enviando ? "Salvando..." : "Criar avaliação"}
        </Button>
      </form>
    </section>
  );
}
