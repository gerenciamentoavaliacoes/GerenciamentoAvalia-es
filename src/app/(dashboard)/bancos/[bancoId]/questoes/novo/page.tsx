"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useBancos } from "@/hooks/useBancos";
import { apiFetch } from "@/utils/api";
import type { TipoQuestao } from "@/types";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { Input, Label, Select, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export default function NovaQuestaoPage({ params }: { params: { bancoId: string } }) {
  const { bancos } = useBancos();
  const router = useRouter();

  const [bancoId, setBancoId] = useState(params.bancoId);
  const [tipo, setTipo] = useState<TipoQuestao>("DISCURSIVA");
  const [enunciado, setEnunciado] = useState("");
  const [peso, setPeso] = useState("1");
  const [gabarito, setGabarito] = useState("");
  const [alternativas, setAlternativas] = useState(["", "", "", ""]);
  const [indiceCorreta, setIndiceCorreta] = useState<number | null>(null);
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  const multiplaEscolha = tipo === "MULTIPLA_ESCOLHA";

  function alterarAlternativa(indice: number, texto: string) {
    setAlternativas((atuais) => atuais.map((a, i) => (i === indice ? texto : a)));
  }

  function adicionarAlternativa() {
    setAlternativas((atuais) => [...atuais, ""]);
  }

  function removerAlternativa(indice: number) {
    setAlternativas((atuais) => atuais.filter((_, i) => i !== indice));
    setIndiceCorreta((atual) => {
      if (atual === null || atual === indice) return null;
      return atual > indice ? atual - 1 : atual;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    if (multiplaEscolha && indiceCorreta === null) {
      setErro("Selecione a alternativa correta.");
      return;
    }

    const alternativasLimpas = alternativas.map((a) => a.trim());
    if (multiplaEscolha && new Set(alternativasLimpas).size !== alternativasLimpas.length) {
      setErro("As alternativas não podem se repetir.");
      return;
    }

    setEnviando(true);

    const res = await apiFetch("/api/questoes", {
      method: "POST",
      body: JSON.stringify({
        bancoId,
        tipo,
        enunciado,
        peso: Number(peso),
        gabarito: multiplaEscolha ? alternativasLimpas[indiceCorreta!] : gabarito,
        alternativas: multiplaEscolha ? alternativasLimpas : [],
      }),
    });

    setEnviando(false);
    if (res.ok) router.push(`/bancos/${bancoId}`);
  }

  return (
    <section className="max-w-2xl">
      <Link
        href={`/bancos/${params.bancoId}`}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar ao banco
      </Link>

      <PageHeader title="Nova Questão" />

      <Card>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="banco">Banco de destino</Label>
                <Select
                  id="banco"
                  value={bancoId}
                  onChange={(e) => setBancoId(e.target.value)}
                >
                  {bancos.map((banco) => (
                    <option key={banco.id} value={banco.id}>
                      {banco.nome}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <Label htmlFor="tipo">Tipo da questão</Label>
                <Select
                  id="tipo"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value as TipoQuestao)}
                >
                  <option value="DISCURSIVA">Discursiva</option>
                  <option value="MULTIPLA_ESCOLHA">Múltipla escolha</option>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="enunciado">Enunciado</Label>
              <Textarea
                id="enunciado"
                required
                rows={4}
                value={enunciado}
                onChange={(e) => setEnunciado(e.target.value)}
              />
            </div>

            <div className="max-w-[160px]">
              <Label htmlFor="peso">Peso (nota)</Label>
              <Input
                id="peso"
                type="number"
                step="0.1"
                min="0"
                required
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
              />
            </div>

            {multiplaEscolha ? (
              <fieldset>
                <legend className="mb-1.5 block text-sm font-medium text-slate-700">
                  Alternativas
                </legend>
                <p className="mb-3 text-xs text-slate-500">
                  Escreva as alternativas e marque a correta (gabarito).
                </p>
                <div className="space-y-2.5">
                  {alternativas.map((alternativa, indice) => (
                    <div key={indice} className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="alternativa-correta"
                        aria-label={`Marcar alternativa ${String.fromCharCode(65 + indice)} como correta`}
                        checked={indiceCorreta === indice}
                        onChange={() => setIndiceCorreta(indice)}
                        className="h-4 w-4 shrink-0 cursor-pointer accent-brand-600"
                      />
                      <span className="w-5 shrink-0 text-sm font-semibold text-slate-500">
                        {String.fromCharCode(65 + indice)})
                      </span>
                      <Input
                        required
                        placeholder={`Alternativa ${String.fromCharCode(65 + indice)}`}
                        value={alternativa}
                        onChange={(e) => alterarAlternativa(indice, e.target.value)}
                        className={
                          indiceCorreta === indice
                            ? "border-emerald-300 bg-emerald-50/40"
                            : ""
                        }
                      />
                      <button
                        type="button"
                        onClick={() => removerAlternativa(indice)}
                        disabled={alternativas.length <= 2}
                        aria-label="Remover alternativa"
                        className="shrink-0 rounded-lg p-2 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600 disabled:pointer-events-none disabled:opacity-30"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                {alternativas.length < 6 && (
                  <button
                    type="button"
                    onClick={adicionarAlternativa}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
                  >
                    <Plus className="h-4 w-4" /> Adicionar alternativa
                  </button>
                )}
              </fieldset>
            ) : (
              <div>
                <Label htmlFor="gabarito">Gabarito</Label>
                <Textarea
                  id="gabarito"
                  required
                  rows={3}
                  placeholder="Resposta esperada"
                  value={gabarito}
                  onChange={(e) => setGabarito(e.target.value)}
                />
              </div>
            )}

            {erro && <p className="text-sm text-rose-600">{erro}</p>}

            <Button type="submit" loading={enviando}>
              {enviando ? "Salvando..." : "Salvar questão"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </section>
  );
}
