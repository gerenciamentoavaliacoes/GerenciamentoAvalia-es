"use client";

import { useEffect, useState } from "react";
import { getToken, setToken as persistToken, clearToken } from "@/utils/auth-storage";

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(getToken());
  }, []);

  async function login(email: string, senha: string) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });
    const data = await res.json();

    if (res.ok) {
      persistToken(data.token);
      setToken(data.token);
    }

    return { ok: res.ok, erro: data.erro as string | undefined };
  }

  function logout() {
    clearToken();
    setToken(null);
  }

  return { token, login, logout };
}
