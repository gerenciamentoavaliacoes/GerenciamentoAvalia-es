"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/utils/api";
import type { BancoQuestoes, Questao } from "@/types";

interface BancoComQuestoes extends BancoQuestoes {
  questoes: Questao[];
}

export function useBanco(bancoId: string) {
  const [banco, setBanco] = useState<BancoComQuestoes | null>(null);
  const [carregando, setCarregando] = useState(true);

  function recarregar() {
    setCarregando(true);
    return apiFetch(`/api/bancos/${bancoId}`)
      .then((res) => res.json())
      .then(setBanco)
      .finally(() => setCarregando(false));
  }

  useEffect(() => {
    recarregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bancoId]);

  return { banco, carregando, recarregar };
}
