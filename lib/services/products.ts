import { getWixServerClient } from "@/lib/wix-client.server";
import { products as wixProducts } from "@wix/stores";

// ─────────────────────────────────────────────────────────────
// Interfaces
// ─────────────────────────────────────────────────────────────

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

export interface SearchProductsOptions {
  query?: string;
  sortBy?: SortOption;
  limit?: number;
}

export interface SearchProductsResult {
  items: Product[];
  total: number;
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function mapProduct(item: wixProducts.Product): Product {
  return {
    id: item._id ?? "",
    name: item.name ?? "",
    slug: item.slug ?? "",
    description: item.description ?? "",
    price: {
      amount: item.priceData?.price?.toString() ?? "0",
      formatted: item.priceData?.formatted?.price ?? "R$ 0,00",
    },
    media:
      item.media?.items?.map((m: wixProducts.MediaItem) => ({
        url: m.image?.url ?? "",
        alt: m.image?.altText ?? item.name ?? "",
      })) ?? [],
    inStock:
      item.stock?.inventoryStatus === wixProducts.InventoryStatus.IN_STOCK,
  };
}

// ─────────────────────────────────────────────────────────────
// getProducts
// ─────────────────────────────────────────────────────────────

export async function getProducts(limit = 10): Promise<Product[]> {
  try {
    const client = await getWixServerClient();
    const response = await client.products
      .queryProducts()
      .limit(limit)
      .find();

    return response.items.map(mapProduct);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }
}

// ─────────────────────────────────────────────────────────────
// searchProducts
// ─────────────────────────────────────────────────────────────

export async function searchProducts(
  options: SearchProductsOptions = {}
): Promise<SearchProductsResult> {
  const { query = "", sortBy = "relevance", limit = 24 } = options;

  try {
    const client = await getWixServerClient();

    // Busca todos os produtos — filtragem feita em JS porque o
    // contains() da Wix API é case-sensitive e sensível a acentos.
    let queryBuilder = client.products.queryProducts().limit(100);

    switch (sortBy) {
      case "price_asc":
        queryBuilder = queryBuilder.ascending("priceData.price");
        break;
      case "price_desc":
        queryBuilder = queryBuilder.descending("priceData.price");
        break;
      case "name_asc":
        queryBuilder = queryBuilder.ascending("name");
        break;
      // "relevance" → ordenação padrão do Wix
    }

    const response = await queryBuilder.find();

    const normalizedQuery = normalize(query.trim());

    const allItems = response.items.map(mapProduct);

    // Filtra em memória: tolerante a acentos e capitalização
    const filtered = normalizedQuery
      ? allItems.filter(
        (p) =>
          normalize(p.name).includes(normalizedQuery) ||
          normalize(p.description).includes(normalizedQuery)
      )
      : allItems;

    return {
      items: filtered.slice(0, limit),
      total: filtered.length,
    };
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return { items: [], total: 0 };
  }
}