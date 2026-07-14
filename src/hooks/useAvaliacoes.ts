"use client";

import { useEffect, useState } from "react";
import type { Avaliacao } from "@/types";

export function useAvaliacoes(turmaId: string) {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch(`/api/turmas/${turmaId}/avaliacoes`)
      .then((res) => res.json())
      .then(setAvaliacoes)
      .finally(() => setCarregando(false));
  }, [turmaId]);

  return { avaliacoes, carregando };
}
