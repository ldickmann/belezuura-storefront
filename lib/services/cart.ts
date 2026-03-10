"use server";
import { getWixServerClient } from "@/lib/wix-client.server";

export async function addToCart(productId: string, quantity: number = 1) {
  const client = await getWixServerClient();
  return client.currentCart.addToCurrentCart({
    lineItems: [
      {
        catalogReference: {
          catalogItemId: productId,
          appId: "215238eb-22a5-4c36-9e7b-e7c08025e04e", // ID fixo do Wix Stores
        },
        quantity,
      },
    ],
  });
}

export async function getCart() {
  const client = await getWixServerClient();
  try {
    return await client.currentCart.getCurrentCart();
  } catch {
    return null;
  }
}