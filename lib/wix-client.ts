import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";

export function getWixClient() {
  const clientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID;

  if (!clientId) {
    throw new Error("NEXT_PUBLIC_WIX_CLIENT_ID não definido");
  }

  return createClient({
    modules: {
      products,
      collections,
    },
    auth: OAuthStrategy({ clientId }),
  });
}