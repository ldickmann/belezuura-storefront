"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { User } from "lucide-react";
import { getWixBrowserClient } from "@/lib/wix-client.browser";

type LoginButtonProps = {
  variant?: "default" | "compact";
};

export function LoginButton({ variant = "default" }: LoginButtonProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const client = getWixBrowserClient();
      if (client.auth.loggedIn()) {
        setIsLoggedIn(true);
      }
    }
    checkAuth();
  }, []);

  async function handleLogin() {
    const client = getWixBrowserClient();
    const data = client.auth.generateOAuthData(
      `${window.location.origin}/login-callback`,
      window.location.href,
    );
    localStorage.setItem("oauthRedirectData", JSON.stringify(data));
    const { authUrl } = await client.auth.getAuthUrl(data);
    window.location.href = authUrl;
  }

  async function handleLogout() {
    const client = getWixBrowserClient();
    const { logoutUrl } = await client.auth.logout(window.location.href);
    Cookies.remove("session");
    window.location.href = logoutUrl;
  }

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
            {/* Indicador visual de logado */}
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full" />
          </Link>

          {/* Texto só em telas maiores */}
          <span className="hidden xl:inline text-[11px] font-semibold uppercase tracking-wide">
            Logado
          </span>

          {/* “Sair” só em telas maiores */}
          <button
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
          onClick={handleLogout}
          className="text-sm text-plum-dark/60 hover:text-plum-dark transition-colors">
          Sair
        </button>
      </div>
    );
  }

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
        onClick={handleLogin}
        className="text-sm text-plum-dark hover:text-sage transition-colors">
        Entrar / Cadastrar
      </button>
    </div>
  );
}
