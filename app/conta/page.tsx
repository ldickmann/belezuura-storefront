"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { getWixBrowserClient } from "@/lib/wix-client.browser";
import type { members } from "@wix/members";

type Member = members.Member;
type AuthState = "loading" | "guest" | "member";

export default function ContaPage() {
  const [member, setMember] = useState<Member | null>(null);
  const [authState, setAuthState] = useState<AuthState>("loading");

  useEffect(() => {
    async function init() {
      const client = getWixBrowserClient();

      if (!client.auth.loggedIn()) {
        setAuthState("guest");
        return;
      }

      try {
        const { member } = await client.members.getCurrentMember({
          fieldsets: ["FULL"],
        });
        setMember(member ?? null);
        setAuthState("member");
      } catch {
        setAuthState("guest");
      }
    }

    init();
  }, []);

  async function handleLogin() {
    const client = getWixBrowserClient();
    const data = client.auth.generateOAuthData(
      `${window.location.origin}/login-callback`,
      `${window.location.origin}/conta`,
    );
    localStorage.setItem("oauthRedirectData", JSON.stringify(data));
    const { authUrl } = await client.auth.getAuthUrl(data);
    window.location.href = authUrl;
  }

  async function handleLogout() {
    const client = getWixBrowserClient();
    const { logoutUrl } = await client.auth.logout(
      `${window.location.origin}/`,
    );
    Cookies.remove("session");
    window.location.href = logoutUrl;
  }

  if (authState === "loading") {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <p className="text-plum-dark/50">Carregando sua conta...</p>
      </div>
    );
  }

  if (authState === "guest") {
    return (
      <section className="container mx-auto px-4 py-24 max-w-sm text-center">
        <h1 className="text-3xl font-serif text-plum-dark mb-3">Minha Conta</h1>
        <p className="text-plum-dark/50 text-sm mb-8">
          Acesse sua conta para ver seus pedidos e favoritos.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleLogin}
            className="w-full h-12 flex items-center justify-center bg-plum-dark text-rose-soft
                       rounded-xl text-sm font-semibold hover:bg-plum-dark/90 transition-colors">
            Entrar
          </button>
          <button
            onClick={handleLogin}
            className="w-full h-12 flex items-center justify-center ring-1 ring-inset ring-plum-dark/25
                       rounded-xl text-sm font-semibold text-plum-dark
                       hover:bg-plum-dark/5 transition-colors">
            Criar conta
          </button>
        </div>

        <Link
          href="/"
          className="block mt-6 text-sm text-plum-dark/40 hover:text-plum-dark transition-colors">
          ← Voltar para a loja
        </Link>
      </section>
    );
  }

  const firstName =
    member?.contact?.firstName || member?.profile?.nickname || "Cliente";
  const email = member?.loginEmail ?? "";
  const phone = member?.contact?.phones?.[0] ?? "";

  return (
    <section className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-serif text-plum-dark mb-6">
        Ola, {firstName}
      </h1>

      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-rose-soft/40">
          <p className="text-xs uppercase tracking-widest text-plum-dark/50 mb-1">
            Email
          </p>
          <p className="text-sm text-plum-dark">{email || "Nao informado"}</p>
        </div>

        <div className="p-4 rounded-xl bg-rose-soft/40">
          <p className="text-xs uppercase tracking-widest text-plum-dark/50 mb-1">
            Telefone
          </p>
          <p className="text-sm text-plum-dark">{phone || "Nao informado"}</p>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={handleLogout}
          className="h-11 px-5 rounded-xl bg-plum-dark text-rose-soft text-sm font-semibold hover:bg-plum-dark/90 transition-colors">
          Sair da conta
        </button>
      </div>
    </section>
  );
}
