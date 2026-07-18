"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/utils/api";
import type { BancoQuestoes } from "@/types";

export function useBancos() {
  const [bancos, setBancos] = useState<BancoQuestoes[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    apiFetch("/api/bancos")
      .then((res) => res.json())
      .then(setBancos)
      .finally(() => setCarregando(false));
  }, []);

  async function criarBanco(nome: string) {
    const res = await apiFetch("/api/bancos", {
      method: "POST",
      body: JSON.stringify({ nome }),
    });
    const banco = await res.json();
    if (res.ok) setBancos((atual) => [...atual, banco]);
    return { ok: res.ok, banco };
  }

  return { bancos, carregando, criarBanco };
}
