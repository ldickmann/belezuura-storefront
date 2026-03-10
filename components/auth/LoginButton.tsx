"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getWixBrowserClient } from "@/lib/wix-client.browser";

export function LoginButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [memberName, setMemberName] = useState<string | null>(null);

  useEffect(() => {
    async function checkAuth() {
      const client = getWixBrowserClient();
      if (client.auth.loggedIn()) {
        setIsLoggedIn(true);
        try {
          const { member } = await client.members.getCurrentMember();
          setMemberName(
            member?.profile?.nickname ||
              member?.contact?.firstName ||
              "Minha Conta",
          );
        } catch {
          setMemberName("Minha Conta");
        }
      }
    }
    checkAuth();
  }, []);

  async function handleLogin() {
    const client = getWixBrowserClient();
    const data = client.auth.generateOAuthData(
      `${window.location.origin}/login-callback`,
      window.location.href, // volta para a página atual após login
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
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-plum-dark">{memberName}</span>
        <button
          onClick={handleLogout}
          className="text-sm text-plum-dark/60 hover:text-plum-dark transition-colors">
          Sair
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleLogin}
      className="text-sm text-plum-dark hover:text-sage transition-colors">
      Entrar / Cadastrar
    </button>
  );
}
