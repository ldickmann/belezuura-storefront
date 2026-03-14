import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { members } from "@wix/members";
import { orders, currentCart } from "@wix/ecom";
import { cookies } from "next/headers";

export async function getWixServerClient() {
  const clientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID;
  if (!clientId) throw new Error("NEXT_PUBLIC_WIX_CLIENT_ID não definido");

  // No servidor, lemos o cookie via next/headers
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  const tokens = sessionCookie
    ? JSON.parse(decodeURIComponent(sessionCookie))
    : undefined;

  return createClient({
    modules: { products, collections, members, orders, currentCart },
    auth: OAuthStrategy({ clientId, tokens }),
  });
}
