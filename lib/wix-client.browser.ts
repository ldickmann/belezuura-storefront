"use client";
import { createClient, OAuthStrategy } from "@wix/sdk";
import { members } from "@wix/members";
import { currentCart } from "@wix/ecom";
import Cookies from "js-cookie";

export function getWixBrowserClient() {
  const clientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID;
  if (!clientId) throw new Error("NEXT_PUBLIC_WIX_CLIENT_ID não definido");

  // No browser, lemos o cookie via js-cookie
  const sessionCookie = Cookies.get("session");
  const tokens = sessionCookie ? JSON.parse(sessionCookie) : undefined;

  return createClient({
    modules: { members, currentCart },
    auth: OAuthStrategy({ clientId, tokens }),
  });
}