"use client";

import { useEffect, useState } from "react";
import type { BancoQuestoes } from "@/types";

export function useBancos() {
  const [bancos, setBancos] = useState<BancoQuestoes[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch("/api/bancos")
      .then((res) => res.json())
      .then(setBancos)
      .finally(() => setCarregando(false));
  }, []);

  return { bancos, carregando };
}
