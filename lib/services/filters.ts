/**
 * lib/services/filters.ts
 *
 * Extrai dados de filtros dos produtos do Wix
 * Para usar no FilterPanel da página /loja
 */

import type { Product } from "./products";

/**
 * ENTENDER ISTO:
 *
 * Quando temos uma lista de produtos, queremos extrair:
 * - Todas as categorias que aparecem
 * - Todas as cores que aparecem
 * - Todos os tamanhos que aparecem
 * - O preço mínimo e máximo
 *
 * Essa função faz exatamente isso!
 */

export interface FilterData {
  categories: Array<{ id: string; label: string; count: number }>;
  colors: Array<{ id: string; label: string; hex: string; count: number }>;
  sizes: Array<{ id: string; label: string; count: number }>;
  priceRange: { min: number; max: number };
}

/**
 * Extrai metadados de filtros a partir da lista de produtos
 *
 * Nota: Como o Wix não retorna campos de categoria/cor/tamanho explícitos,
 * usamos o nome do produto para extrair essa informação inicialmente.
 * Futuramente, você pode mapear para campos customizados do Wix.
 *
 * @param products - Lista de produtos do Wix
 * @returns Dados estruturados para o FilterPanel
 */
export function extractFilterData(products: Product[]): FilterData {
  const categoriesMap = new Map<string, number>();
  const colorsMap = new Map<string, { hex: string; count: number }>();
  const sizesMap = new Map<string, number>();
  let minPrice = Infinity;
  let maxPrice = 0;

  // ─────────────────────────────────────────────────────────────
  // Dados mapeados (você pode customizar isso conforme necessário)
  // ─────────────────────────────────────────────────────────────

  const CATEGORY_KEYWORDS: Record<string, boolean> = {
    acessorios: true,
    cabelos: true,
    calcas: true,
    camisas: true,
    conjuntos: true,
    fitness: true,
    jaquetas: true,
    jeans: true,
    lingerie: true,
    maquiagem: true,
    pele: true,
    praia: true,
    saias: true,
    shorts: true,
    vestidos: true,
  };

  const COLOR_MAP: Record<string, string> = {
    vermelho: "#ef4444",
    red: "#ef4444",
    azul: "#3b82f6",
    blue: "#3b82f6",
    laranja: "#f97316",
    orange: "#f97316",
    preto: "#1f2937",
    black: "#1f2937",
    branco: "#f5f5f5",
    white: "#f5f5f5",
    verde: "#10b981",
    green: "#10b981",
    amarelo: "#eab308",
    yellow: "#eab308",
    rosa: "#ec4899",
    pink: "#ec4899",
  };

  const SIZE_KEYWORDS = ["s", "m", "l", "xl", "xxl", "5xl", "p", "m", "g"];

  // ─────────────────────────────────────────────────────────────
  // Processar cada produto
  // ─────────────────────────────────────────────────────────────

  products.forEach((product) => {
    const nameLower = product.name.toLowerCase();
    const descLower = product.description.toLowerCase();
    const fullText = `${nameLower} ${descLower}`;

    // 1. Extrair categorias
    Object.keys(CATEGORY_KEYWORDS).forEach((category) => {
      if (fullText.includes(category)) {
        categoriesMap.set(category, (categoriesMap.get(category) || 0) + 1);
      }
    });

    // 2. Extrair cores
    Object.entries(COLOR_MAP).forEach(([colorName, colorHex]) => {
      if (fullText.includes(colorName.toLowerCase())) {
        const current = colorsMap.get(colorName) || {
          hex: colorHex,
          count: 0,
        };
        colorsMap.set(colorName, {
          hex: colorHex,
          count: current.count + 1,
        });
      }
    });

    // 3. Extrair tamanhos
    SIZE_KEYWORDS.forEach((size) => {
      if (fullText.includes(size)) {
        sizesMap.set(size, (sizesMap.get(size) || 0) + 1);
      }
    });

    // 4. Extrair preço mínimo e máximo
    const price = parseFloat(product.price.amount);
    if (price < minPrice) minPrice = price;
    if (price > maxPrice) maxPrice = price;
  });

  // ─────────────────────────────────────────────────────────────
  // Converter maps para arrays do tipo esperado
  // ─────────────────────────────────────────────────────────────

  return {
    categories: Array.from(categoriesMap.entries()).map(([id, count]) => ({
      id,
      label: id.charAt(0).toUpperCase() + id.slice(1),
      count,
    })),

    colors: Array.from(colorsMap.entries()).map(([id, { hex, count }]) => ({
      id,
      label: id.charAt(0).toUpperCase() + id.slice(1),
      hex,
      count,
    })),

    sizes: Array.from(sizesMap.entries()).map(([id, count]) => ({
      id,
      label: id.toUpperCase(),
      count,
    })),

    priceRange: {
      min: isFinite(minPrice) ? Math.floor(minPrice) : 0,
      max: isFinite(maxPrice) ? Math.ceil(maxPrice) : 1000,
    },
  };
}