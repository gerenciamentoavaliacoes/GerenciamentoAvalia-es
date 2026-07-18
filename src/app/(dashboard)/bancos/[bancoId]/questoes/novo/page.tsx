"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);

    const res = await apiFetch("/api/questoes", {
      method: "POST",
      body: JSON.stringify({
        bancoId,
        tipo,
        enunciado,
        peso: Number(peso),
        gabarito,
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

            <div>
              <Label htmlFor="gabarito">Gabarito</Label>
              <Textarea
                id="gabarito"
                required
                rows={3}
                placeholder={
                  tipo === "DISCURSIVA" ? "Resposta esperada" : "Alternativa correta"
                }
                value={gabarito}
                onChange={(e) => setGabarito(e.target.value)}
              />
            </div>

            <Button type="submit" loading={enviando}>
              {enviando ? "Salvando..." : "Salvar questão"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </section>
  );
}
