// app/conta/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { getWixBrowserClient } from "@/lib/wix-client.browser";
import type { members } from "@wix/members";

type Member = members.Member;

export default function ContaPage() {
  const router = useRouter();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const client = getWixBrowserClient();

      if (!client.auth.loggedIn()) {
        // Não está logado: inicia o fluxo OAuth direto
        const data = client.auth.generateOAuthData(
          `${window.location.origin}/login-callback`,
          window.location.href,
        );
        localStorage.setItem("oauthRedirectData", JSON.stringify(data));
        const { authUrl } = await client.auth.getAuthUrl(data);
        window.location.href = authUrl;
        return;
      }

      // Está logado: busca os dados do membro
      try {
        const { member } = await client.members.getCurrentMember({
          fieldsets: ["FULL"],
        });
        setMember(member ?? null);
      } catch {
        setMember(null);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  async function handleLogout() {
    const client = getWixBrowserClient();
    const { logoutUrl } = await client.auth.logout(
      `${window.location.origin}/`,
    );
    Cookies.remove("session");
    window.location.href = logoutUrl;
  }

  // Enquanto verifica a sessão ou redireciona para login
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <p className="text-plum-dark/50">Carregando sua conta...</p>
      </div>
    );
  }

  // Logado: exibe a área do membro
  const firstName =
    member?.contact?.firstName || member?.profile?.nickname || "Cliente";
  const email = member?.loginEmail ?? "";
  const phone = member?.contact?.phones?.[0] ?? "";

  return (
    <section className="container mx-auto px-4 py-12 max-w-2xl">
      {/* Saudação */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-plum-dark mb-1">
          Olá, {firstName}!
        </h1>
        <p className="text-plum-dark/50 text-sm">
          Gerencie sua conta e acompanhe seus pedidos.
        </p>
      </div>

      {/* Card de dados */}
      <div className="bg-rose-soft/30 rounded-2xl p-6 mb-6 space-y-4">
        <h2 className="text-sm font-semibold text-plum-dark/60 uppercase tracking-widest mb-4">
          Seus dados
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="text-xs text-plum-dark/40 block mb-0.5">Nome</span>
            <span className="text-plum-dark font-medium">
              {member?.contact?.firstName} {member?.contact?.lastName}
            </span>
          </div>

          {email && (
            <div>
              <span className="text-xs text-plum-dark/40 block mb-0.5">
                E-mail
              </span>
              <span className="text-plum-dark font-medium">{email}</span>
            </div>
          )}

          {phone && (
            <div>
              <span className="text-xs text-plum-dark/40 block mb-0.5">
                Telefone
              </span>
              <span className="text-plum-dark font-medium">{phone}</span>
            </div>
          )}
        </div>
      </div>

      {/* Links rápidos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        <Link
          href="/pedidos"
          className="flex items-center gap-3 p-4 rounded-xl border border-sand/40
                     hover:border-plum-dark/30 hover:bg-rose-soft/20 transition-all group">
          <span className="text-2xl">📦</span>
          <div>
            <p className="font-medium text-plum-dark group-hover:text-sage transition-colors">
              Meus Pedidos
            </p>
            <p className="text-xs text-plum-dark/40">Acompanhe suas compras</p>
          </div>
        </Link>

        <Link
          href="/favoritos"
          className="flex items-center gap-3 p-4 rounded-xl border border-sand/40
                     hover:border-plum-dark/30 hover:bg-rose-soft/20 transition-all group">
          <span className="text-2xl">❤️</span>
          <div>
            <p className="font-medium text-plum-dark group-hover:text-sage transition-colors">
              Favoritos
            </p>
            <p className="text-xs text-plum-dark/40">
              Produtos que você salvou
            </p>
          </div>
        </Link>
      </div>

      {/* Sair */}
      <button
        onClick={handleLogout}
        className="w-full py-3 rounded-xl border border-plum-dark/20 text-plum-dark/60
                   hover:border-plum-dark/40 hover:text-plum-dark transition-all text-sm">
        Sair da conta
      </button>
    </section>
  );
}
