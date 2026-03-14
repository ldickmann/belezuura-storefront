"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { User } from "lucide-react";
import { getWixBrowserClient } from "@/lib/wix-client.browser";

type LoginButtonProps = {
  variant?: "default" | "compact";
};

export function LoginButton({ variant = "default" }: LoginButtonProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verifica autenticação ao montar o componente
  useEffect(() => {
    let mounted = true;

    async function checkAuth() {
      try {
        const client = getWixBrowserClient();
        if (mounted && client.auth.loggedIn()) {
          setIsLoggedIn(true);
        }
      } catch {
        // Em caso de falha, mantém estado padrão (deslogado)
        if (mounted) setIsLoggedIn(false);
      }
    }

    void checkAuth();

    return () => {
      mounted = false;
    };
  }, []);

  async function handleLogin() {
    try {
      const client = getWixBrowserClient();
      const data = client.auth.generateOAuthData(
        `${window.location.origin}/login-callback`,
        window.location.href,
      );

      localStorage.setItem("oauthRedirectData", JSON.stringify(data));
      const { authUrl } = await client.auth.getAuthUrl(data);
      window.location.href = authUrl;
    } catch {
      // Se necessário, você pode trocar por um toast no futuro
      console.error("Falha ao iniciar login.");
    }
  }

  async function handleLogout() {
    try {
      const client = getWixBrowserClient();
      const { logoutUrl } = await client.auth.logout(window.location.href);
      Cookies.remove("session");
      window.location.href = logoutUrl;
    } catch {
      console.error("Falha ao fazer logout.");
    }
  }

  // Estado logado
  if (isLoggedIn) {
    if (variant === "compact") {
      return (
        <div className="flex items-center gap-2 text-plum-dark">
          <Link
            href="/conta"
            aria-label="Minha conta"
            className="relative inline-flex items-center gap-1">
            <User
              size={18}
              className="shrink-0"
            />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full" />
          </Link>

          <span className="hidden xl:inline text-[11px] font-semibold uppercase tracking-wide">
            Logado
          </span>

          <button
            type="button"
            onClick={handleLogout}
            className="hidden xl:inline text-[11px] text-plum-dark/60 hover:text-plum-dark transition-colors">
            Sair
          </button>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-3">
        <Link
          href="/conta"
          aria-label="Minha conta"
          className="inline-flex items-center gap-2 text-plum-dark">
          <User
            size={18}
            className="shrink-0"
          />
          <span className="text-sm font-semibold">Logado</span>
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="text-sm text-plum-dark/60 hover:text-plum-dark transition-colors">
          Sair
        </button>
      </div>
    );
  }

  // Estado deslogado + versão compacta (header desktop)
  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={handleLogin}
        className="hidden md:flex items-center gap-2 text-left group"
        aria-label="Entrar ou cadastrar">
        <span className="hidden min-[1281px]:flex flex-col leading-[1.05] whitespace-nowrap">
          <span className="text-[11px] font-semibold text-plum-dark">
            Bem-vinda!
          </span>
          <span className="text-[12px] text-plum-dark/70 group-hover:text-plum-dark transition-colors">
            Entre ou cadastre
          </span>
        </span>

        <User
          size={18}
          className="shrink-0 text-plum-dark"
        />
      </button>
    );
  }

  // Estado deslogado + versão padrão
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/conta"
        aria-label="Minha conta"
        className="inline-flex items-center text-plum-dark hover:text-sage transition-colors">
        <User
          size={18}
          className="shrink-0"
        />
      </Link>

      <button
        type="button"
        onClick={handleLogin}
        className="text-sm text-plum-dark hover:text-sage transition-colors">
        Entrar / Cadastrar
      </button>
    </div>
  );
}
