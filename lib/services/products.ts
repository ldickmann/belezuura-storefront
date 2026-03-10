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

export type SortOption = "relevance" | "price_asc" | "price_desc" | "name_asc";

// 
export interface SearchProductsOptions {
  query?: string;
  sortBy?: SortOption;
  limit?: number;
}

//
export interface SearchProductsResult {
  items: Product[];
  total: number;
}

// Função para buscar produtos do Wix
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

export async function searchProducts(
  options: SearchProductsOptions = {}
): Promise<SearchProductsResult> {
  const { query = "", sortBy = "relevance", limit = 24 } = options;

  try {
    const client = await getWixServerClient();
    //
    let q: any = client.products.queryProducts();

    if (query.trim()) {
      q = q.contains("name", query.trim());
    }

    switch (sortBy) {
      case "price_asc":
        q = q.ascending("priceData.price");
        break;
      case "price_desc":
        q = q.descending("priceData.price");
        break;
      case "name_asc":
        q = q.ascending("name");
        break;
      // "relevance" → ordenação padrão do Wix
    }

    const response = await q.limit(limit).find();

    return {
      items: response.items.map((item: any) => ({
        id: item._id ?? "",
        name: item.name ?? "",
        slug: item.slug ?? "",
        description: item.description ?? "",
        price: {
          amount: item.price?.price?.toString() ?? "0",
          formatted: item.price?.formatted?.price ?? "R$ 0,00",
        },
        media:
          item.media?.items?.map((m: any) => ({
            url: m.image?.url ?? "",
            alt: m.image?.altText ?? item.name ?? "",
          })) ?? [],
        inStock: item.stock?.inStock ?? false,
      })),
      total: response.totalCount ?? 0,
    };
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return { items: [], total: 0 };
  }
}