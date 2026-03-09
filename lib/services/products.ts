import { getWixServerClient } from "@/lib/wix-client.server";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: {
    amount: string;
    formatted: string;
  };
  media: {
    url: string;
    alt: string;
  }[];
  inStock: boolean;
}

export async function getProducts(limit = 10): Promise<Product[]> {
  try {
    const client = await getWixServerClient();
    const response = await client.products
      .queryProducts()
      .limit(limit)
      .find();

    return response.items.map((item) => ({
      id: item._id ?? "",
      name: item.name ?? "",
      slug: item.slug ?? "",
      description: item.description ?? "",
      price: {
        amount: item.price?.price?.toString() ?? "0",
        formatted: item.price?.formatted?.price ?? "R$ 0,00",
      },
      media:
        item.media?.items?.map((m) => ({
          url: m.image?.url ?? "",
          alt: m.image?.altText ?? item.name ?? "",
        })) ?? [],
      inStock: item.stock?.inStock ?? false,
    }));
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }
}