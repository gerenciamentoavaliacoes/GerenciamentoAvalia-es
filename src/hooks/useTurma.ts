"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/utils/api";
import type { Aluno, Avaliacao, Turma } from "@/types";

interface TurmaDetalhada extends Turma {
  avaliacoes: Avaliacao[];
  matriculas: { alunoId: string; aluno: Aluno }[];
}

export function useTurma(turmaId: string) {
  const [turma, setTurma] = useState<TurmaDetalhada | null>(null);
  const [carregando, setCarregando] = useState(true);

  function recarregar() {
    setCarregando(true);
    return apiFetch(`/api/turmas/${turmaId}`)
      .then((res) => res.json())
      .then(setTurma)
      .finally(() => setCarregando(false));
  }

  useEffect(() => {
    recarregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turmaId]);

  return { turma, carregando, recarregar };
}
