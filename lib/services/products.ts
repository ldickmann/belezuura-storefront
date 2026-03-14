import { getWixServerClient } from "@/lib/wix-client.server";
import { products as wixProducts } from "@wix/stores";

// ─────────────────────────────────────────────────────────────
// Interfaces públicas
// ─────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: {
    /** Valor numérico como string, ex: "79.9" */
    amount: string;
    /** Valor formatado pela API do Wix, ex: "R$ 79,90" */
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

/**
 * Interface para opções de filtro
 * Usada para filtrar produtos em memória
 */
export interface FilterOptions {
  categories?: string[];
  colors?: string[];
  sizes?: string[];
  priceMin?: number;
  priceMax?: number;
}

// ─────────────────────────────────────────────────────────────
// Helpers internos
// ─────────────────────────────────────────────────────────────

/**
 * Remove acentos e coloca em minúsculas para comparação tolerante.
 * Ex: "Óculos" → "oculos"
 */
function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/**
 * Mapeia um item bruto da API Wix para o modelo interno Product.
 * Centralizado aqui para que getProducts, getProductBySlug e
 * searchProducts usem sempre a mesma transformação.
 */
function mapProduct(item: wixProducts.Product): Product {
  return {
    id: item._id ?? "",
    name: item.name ?? "",
    slug: item.slug ?? "",
    description: item.description ?? "",
    price: {
      // priceData é o campo atual — item.price está deprecated no SDK
      amount: item.priceData?.price?.toString() ?? "0",
      formatted: item.priceData?.formatted?.price ?? "R$ 0,00",
    },
    media:
      item.media?.items?.map((m: wixProducts.MediaItem) => ({
        url: m.image?.url ?? "",
        alt: m.image?.altText ?? item.name ?? "",
      })) ?? [],
    // inventoryStatus é o campo atual — item.stock.inStock está deprecated
    inStock:
      item.stock?.inventoryStatus === wixProducts.InventoryStatus.IN_STOCK,
  };
}

/**
 * Ordena um array de produtos em memória.
 * Usamos ordenação JS em vez de .ascending()/.descending() da Wix
 * porque os nomes de campo aceitos pela query builder variam por versão
 * do SDK e causam erros em runtime.
 */
function sortProducts(items: Product[], sortBy: SortOption): Product[] {
  const sorted = [...items]; // não muta o array original

  switch (sortBy) {
    case "price_asc":
      sorted.sort((a, b) => parseFloat(a.price.amount) - parseFloat(b.price.amount));
      break;
    case "price_desc":
      sorted.sort((a, b) => parseFloat(b.price.amount) - parseFloat(a.price.amount));
      break;
    case "name_asc":
      sorted.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
      break;
    // "relevance" → mantém a ordem original retornada pelo Wix
  }

  return sorted;
}

// ─────────────────────────────────────────────────────────────
// getProducts — listagem simples (home, destaques, etc.)
// ─────────────────────────────────────────────────────────────

/**
 * Retorna os primeiros `limit` produtos sem filtro.
 * Indicado para seções de destaque na home.
 */
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
// getProductBySlug — página de produto individual
// ─────────────────────────────────────────────────────────────

/**
 * Busca um único produto pelo seu slug.
 * Retorna null se não encontrado (chame notFound() no Server Component).
 */
export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  try {
    const client = await getWixServerClient();
    const response = await client.products
      .queryProducts()
      .eq("slug", slug)
      .limit(1)
      .find();

    if (!response.items.length) return null;
    return mapProduct(response.items[0]);
  } catch (error) {
    console.error("Erro ao buscar produto por slug:", error);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────
// searchProducts — busca e catálogo (/search, /loja)
// ─────────────────────────────────────────────────────────────

/**
 * Busca produtos com filtro de texto e ordenação.
 *
 * Estratégia:
 * - Busca todos os produtos de uma vez (limit 100) para maximizar cobertura.
 * - Filtragem e ordenação são feitas em JS para suportar acentos,
 *   capitalização variada e evitar incompatibilidades com a query API do Wix.
 * - Para catálogos grandes (> 100 itens), substituir por paginação no futuro.
 */
export async function searchProducts(
  options: SearchProductsOptions = {}
): Promise<SearchProductsResult> {
  const { query = "", sortBy = "relevance", limit = 24 } = options;

  try {
    const client = await getWixServerClient();

    // Busca sem modificadores de sort — ordenação feita em JS abaixo
    const response = await client.products
      .queryProducts()
      .limit(100)
      .find();

    const allItems = response.items.map(mapProduct);

    // Ordena antes de filtrar para respeitar a ordem mesmo em resultados parciais
    const sorted = sortProducts(allItems, sortBy);

    // Filtra em memória: tolerante a acentos e capitalização
    // Ex: "oculos" encontra "Óculos r..." e "óculos redondos"
    const normalizedQuery = normalize(query.trim());
    const filtered = normalizedQuery
      ? sorted.filter(
        (p) =>
          normalize(p.name).includes(normalizedQuery) ||
          normalize(p.description).includes(normalizedQuery)
      )
      : sorted;

    return {
      items: filtered.slice(0, limit),
      total: filtered.length,
    };
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return { items: [], total: 0 };
  }
}

// ─────────────────────────────────────────────────────────────
// filterProducts — filtra produtos por categoria, cor, tamanho, preço
// ─────────────────────────────────────────────────────────────

/**
 * Filtra produtos em memória baseado em critérios
 *
 * ENTENDER ISTO:
 * Como o Wix não retorna campos de categoria/cor/tamanho,
 * usamos busca por palavras-chave no nome e descrição
 *
 * Exemplo:
 * - Filtro: categories=["jeans"]
 * - Produto: "Calça jeans feminina"
 * - Match: ✅ (nome inclui "jeans")
 *
 * @param products - Lista de produtos
 * @param options - Opções de filtro
 * @returns Produtos filtrados
 */
export function filterProducts(
  products: Product[],
  options: FilterOptions
): Product[] {
  return products.filter((product) => {
    const nameLower = product.name.toLowerCase();
    const descLower = product.description.toLowerCase();
    const fullText = `${nameLower} ${descLower}`;

    // 1. Filtro de Categoria
    if (options.categories && options.categories.length > 0) {
      const hasCategory = options.categories.some((cat) =>
        fullText.includes(cat.toLowerCase())
      );
      if (!hasCategory) return false;
    }

    // 2. Filtro de Cores
    if (options.colors && options.colors.length > 0) {
      const hasColor = options.colors.some((color) =>
        fullText.includes(color.toLowerCase())
      );
      if (!hasColor) return false;
    }

    // 3. Filtro de Tamanhos
    if (options.sizes && options.sizes.length > 0) {
      const hasSize = options.sizes.some((size) =>
        fullText.includes(size.toLowerCase())
      );
      if (!hasSize) return false;
    }

    // 4. Filtro de Preço
    const price = parseFloat(product.price.amount);
    if (options.priceMin !== undefined && price < options.priceMin) {
      return false;
    }
    if (options.priceMax !== undefined && price > options.priceMax) {
      return false;
    }

    return true;
  });
}