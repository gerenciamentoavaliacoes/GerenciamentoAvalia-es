"use client";

import { useEffect, useState } from "react";
import type { Turma } from "@/types";

export function useTurmas() {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch("/api/turmas")
      .then((res) => res.json())
      .then(setTurmas)
      .finally(() => setCarregando(false));
  }, []);

  return { turmas, carregando };
}
