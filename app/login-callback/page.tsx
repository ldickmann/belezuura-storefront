"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { getWixBrowserClient } from "@/lib/wix-client.browser";

export default function LoginCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function finalizeLogin() {
      try {
        const client = getWixBrowserClient();

        // Recupera os dados de autorização salvos antes do redirect
        const oauthData = localStorage.getItem("oauthRedirectData");
        if (!oauthData)
          throw new Error("Dados de autorização não encontrados.");
        const data = JSON.parse(oauthData);
        localStorage.removeItem("oauthRedirectData");

        // Troca o código de autorização pelos tokens de membro
        const { code, state } = client.auth.parseFromUrl();
        let tokens = await client.auth.getMemberTokens(code, state, data);

        // Aguarda o token de refresh estar disponível
        while (!tokens?.refreshToken?.value) {
          tokens = await client.auth.getMemberTokens(code, state, data);
        }

        // Salva os tokens na cookie de sessão
        Cookies.set("session", JSON.stringify(tokens), {
          expires: 365,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        });

        // Redireciona para a página de origem ou home
        router.replace(data?.originalUri || "/");
      } catch (e) {
        console.error("Erro no login:", e);
        setError("Não foi possível concluir o login. Tente novamente.");
      }
    }

    finalizeLogin();
  }, [router]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <a
          href="/"
          className="text-plum-dark underline">
          Voltar para a home
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <p className="text-plum-dark/60">Entrando na sua conta...</p>
    </div>
  );
}
