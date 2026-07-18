"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/utils/api";
import type { Turma } from "@/types";

interface ResumoDashboard {
  totalAlunos: number;
  totalAvaliacoes: number;
  turmasRecentes: Turma[];
}

export function useDashboard() {
  const [resumo, setResumo] = useState<ResumoDashboard | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    apiFetch("/api/dashboard")
      .then(async (res) => {
        if (res.ok) setResumo(await res.json());
      })
      .finally(() => setCarregando(false));
  }, []);

  return { resumo, carregando };
}
