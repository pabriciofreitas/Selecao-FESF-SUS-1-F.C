"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/use-user-store";

export default function Home() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/auth/google", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Falha ao autenticar com Google mockado.");
      }

      const user = await response.json();
      setUser(user);
      router.push("/produto");
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : "Erro inesperado ao autenticar."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_42%),linear-gradient(135deg,#0f172a_0%,#111827_45%,#020617_100%)] px-6 py-10 text-white">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl flex-col justify-center gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl space-y-6">
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-slate-100 backdrop-blur">
            Login mockado com OAuth2 Google
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Acesso simples, estado global persistido e rota protegida em Next.js.
          </h1>
          <p className="text-base leading-8 text-slate-300 sm:text-lg">
            Neste primeiro passo, o login simula o retorno do backend, salva nome,
            foto e URL do usuário no Zustand e redireciona para /produto.
          </p>
          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="inline-flex h-12 items-center justify-center rounded-full bg-cyan-400 px-6 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Entrando..." : "Entrar com Google"}
          </button>
          {error ? <p className="text-sm text-rose-300">{error}</p> : null}
        </div>

        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
          <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-950/50 p-5">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-300">
              Fluxo
            </p>
            <div className="space-y-3 text-sm text-slate-200">
              <p>1. Clique no login mockado</p>
              <p>2. O backend fake devolve nome, foto e URL</p>
              <p>3. Zustand armazena o usuário globalmente</p>
              <p>4. O app redireciona para /produto</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
