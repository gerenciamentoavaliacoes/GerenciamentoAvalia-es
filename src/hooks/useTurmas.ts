"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/utils/api";
import type { Turma } from "@/types";

export function useTurmas() {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    apiFetch("/api/turmas")
      .then((res) => res.json())
      .then(setTurmas)
      .finally(() => setCarregando(false));
  }, []);

  async function criarTurma(dados: { nome: string; codigo: string; periodo: string }) {
    const res = await apiFetch("/api/turmas", {
      method: "POST",
      body: JSON.stringify(dados),
    });
    const turma = await res.json();
    if (res.ok) setTurmas((atual) => [...atual, turma]);
    return { ok: res.ok, turma };
  }

  return { turmas, carregando, criarTurma };
}
