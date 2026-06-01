"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getContacts, type Contact } from "@/service/contact-service";
import { useUserStore } from "@/store/use-user-store";

export default function ProdutoPage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      router.replace("/");
      return;
    }

    async function loadContacts() {
      try {
        setLoadingContacts(true);
        setError("");

        const data = await getContacts();
        setContacts(data);
      } catch (contactError) {
        setError(
          contactError instanceof Error
            ? contactError.message
            : "Erro inesperado ao buscar contatos."
        );
      } finally {
        setLoadingContacts(false);
      }
    }

    void loadContacts();
  }, [router, user]);

  function handleLogout() {
    clearUser();
    router.push("/");
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-6 text-white sm:px-10">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6">
        <header className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {user ? (
              <Image
                src={user.photoUrl}
                alt={user.name}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full border border-white/15 object-cover"
                unoptimized
              />
            ) : null}
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">
                Usuário logado
              </p>
              <h1 className="text-xl font-semibold text-white">
                {user?.name ?? "Carregando usuário..."}
              </h1>
              {user ? (
                <a
                  href={user.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-slate-300 underline-offset-4 hover:underline"
                >
                  {user.url}
                </a>
              ) : null}
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 px-5 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Sair
          </button>
        </header>

        <section className="grid gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">Contatos</h2>
            <p className="mt-1 text-sm text-slate-400">
              Resultado do GET /contatos em mock.
            </p>
          </div>

          {error ? (
            <p className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200">
              {error}
            </p>
          ) : null}

          <div className="grid gap-3">
            {loadingContacts ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-300">
                Carregando contatos...
              </div>
            ) : (
              contacts.map((contact) => (
                <article
                  key={`${contact.name}-${contact.phone}`}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/8"
                >
                  <h3 className="text-lg font-medium text-white">{contact.name}</h3>
                  <p className="mt-1 text-sm text-slate-300">{contact.phone}</p>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
