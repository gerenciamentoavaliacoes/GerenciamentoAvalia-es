"use client";

import { useState } from "react";

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);

  async function login(email: string, senha: string) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });
    const data = await res.json();
    if (res.ok) setToken(data.token);
    return data;
  }

  return { token, login };
}
