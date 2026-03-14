"use client";
import { createClient, OAuthStrategy } from "@wix/sdk";
import { members } from "@wix/members";
import { currentCart } from "@wix/ecom";
import Cookies from "js-cookie";

export function getWixBrowserClient() {
  const clientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID;
  if (!clientId) throw new Error("NEXT_PUBLIC_WIX_CLIENT_ID não definido");

  // Lê tokens salvos (cookie com encode)
  const sessionCookie = Cookies.get("session");
  const tokens = sessionCookie
    ? JSON.parse(decodeURIComponent(sessionCookie))
    : undefined;

  const client = createClient({
    modules: { members, currentCart },
    auth: OAuthStrategy({ clientId, tokens }),
  });

  // Salva tokens atuais/renovados para manter a sessão válida
  const currentTokens = client.auth.getTokens();
  if (currentTokens) {
    Cookies.set("session", encodeURIComponent(JSON.stringify(currentTokens)), {
      expires: 365,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }

  return client;
}
