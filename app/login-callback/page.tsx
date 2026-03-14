"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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

        // Aguarda o token de refresh estar disponível (máx 5 tentativas)
        let tries = 0;
        while (!tokens?.refreshToken?.value && tries < 5) {
          tokens = await client.auth.getMemberTokens(code, state, data);
          tries += 1;
        }

        if (!tokens?.refreshToken?.value) {
          throw new Error("Token de refresh não foi obtido.");
        }

        // Coloca os tokens no client
        client.auth.setTokens(tokens);

        // Salva os tokens na cookie de sessão
        Cookies.set("session", encodeURIComponent(JSON.stringify(tokens)), {
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
        <Link
          href="/"
          className="text-plum-dark underline">
          Voltar para a home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <p className="text-plum-dark/60">Entrando na sua conta...</p>
    </div>
  );
}
