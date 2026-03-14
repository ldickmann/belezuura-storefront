/**
 * Página da Loja — /loja
 *
 * Catálogo completo de produtos com filtragem e ordenação.
 * Server Component — dados buscados via Wix Stores API.
 *
 * Fluxo:
 * 1. Lê search params (sort, categories, colors, sizes, priceMin, priceMax)
 * 2. Busca produtos do Wix
 * 3. Filtra produtos em memória baseado nos params
 * 4. Extrai dados dos filtros (para a UI)
 * 5. Renderiza FilterPanel + Grid
 */

import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  searchProducts,
  filterProducts,
  type FilterOptions,
  type Product,
  type SortOption,
} from "@/lib/services/products";
import { SortSelect } from "@/components/search/SortSelect";
import { extractFilterData } from "@/lib/services/filters";
import { FilterPanel } from "@/components/search/FilterPanel";

// ─────────────────────────────────────────────────────────────
// Metadata estática
// ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Loja | Belezuura",
  description:
    "Explore todos os produtos Belezuura — moda, beleza e bem-estar.",
};

// ─────────────────────────────────────────────────────────────
// Utils
// ─────────────────────────────────────────────────────────────

const VALID_SORTS: SortOption[] = [
  "relevance",
  "price_asc",
  "price_desc",
  "name_asc",
];

function parseSort(value?: string): SortOption {
  if (VALID_SORTS.includes(value as SortOption)) return value as SortOption;
  return "relevance";
}

/**
 * ENTENDER ISTO:
 *
 * Esta função converte os parâmetros da URL em uma estrutura
 * que a função filterProducts() consegue entender.
 *
 * URL: /loja?categories=jeans,camisas&colors=azul&priceMin=50&priceMax=200
 * Resultado:
 * {
 *   categories: ["jeans", "camisas"],
 *   colors: ["azul"],
 *   priceMin: 50,
 *   priceMax: 200
 * }
 */
function parseFilters(searchParams: {
  categories?: string;
  colors?: string;
  sizes?: string;
  priceMin?: string;
  priceMax?: string;
}): FilterOptions {
  return {
    categories: searchParams.categories
      ? searchParams.categories.split(",").filter(Boolean)
      : undefined,
    colors: searchParams.colors
      ? searchParams.colors.split(",").filter(Boolean)
      : undefined,
    sizes: searchParams.sizes
      ? searchParams.sizes.split(",").filter(Boolean)
      : undefined,
    priceMin: searchParams.priceMin
      ? parseFloat(searchParams.priceMin)
      : undefined,
    priceMax: searchParams.priceMax
      ? parseFloat(searchParams.priceMax)
      : undefined,
  };
}

// ─────────────────────────────────────────────────────────────
// ProductCard
// ─────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group">
      <Link
        href={`/produto/${product.slug}`}
        className="block">
        <div className="relative aspect-3/4 bg-rose-soft rounded-2xl overflow-hidden mb-3">
          {product.media[0]?.url ? (
            <Image
              src={product.media[0].url}
              alt={product.media[0].alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-rose-soft dots-pattern--sm" />
          )}

          {!product.inStock && (
            <div className="absolute top-2.5 left-2.5">
              <span
                className="bg-plum-dark/80 text-rose-soft px-2 py-0.5 rounded-md
                           text-[10px] font-semibold tracking-wide uppercase">
                Esgotado
              </span>
            </div>
          )}
        </div>

        <div className="px-0.5 space-y-0.5">
          <h3
            className="text-[13px] md:text-sm font-medium text-plum-dark leading-snug
                       group-hover:text-sage transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm font-semibold text-plum-dark">
            {product.price.formatted}
          </p>
        </div>
      </Link>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────

export default async function LojaPage({
  searchParams,
}: {
  searchParams: Promise<{
    sort?: string;
    categories?: string;
    colors?: string;
    sizes?: string;
    priceMin?: string;
    priceMax?: string;
  }>;
}) {
  // 1. Ler parâmetros da URL
  const params = await searchParams;
  const sortBy = parseSort(params.sort);
  const filterOptions = parseFilters(params);

  // 2. Buscar TODOS os produtos do Wix (sem filtro)
  const { items: allProducts } = await searchProducts({
    sortBy,
    limit: 100,
  });

  // 3. Filtrar em memória baseado nos parâmetros
  const filteredProducts = filterProducts(allProducts, filterOptions);
  const total = filteredProducts.length;

  // 4. Extrair dados dos filtros (para a UI do FilterPanel)
  // IMPORTANTE: passa produtos filtrados para contagens corretas
  const filterData = extractFilterData(filteredProducts);

  // Verificar se há filtros ativos
  const hasActiveFilters = Object.keys(filterOptions).some(
    (k) => filterOptions[k as keyof FilterOptions],
  );

  return (
    <main className="min-h-[60vh]">
      {/* ── Cabeçalho ─────────────────────────────────────── */}
      <section className="bg-rose-soft/40 border-b border-sand/20 py-8 md:py-10">
        <div className="container mx-auto px-4">
          <p className="text-[11px] font-bold tracking-widest text-plum-dark/40 uppercase mb-2">
            Catálogo
          </p>
          <h1 className="text-2xl md:text-3xl font-serif text-plum-dark">
            Todos os produtos
          </h1>
          <p className="text-sm text-plum-dark/50 mt-1.5">
            {total} produto{total !== 1 ? "s" : ""} disponíve
            {total !== 1 ? "is" : "l"}
            {hasActiveFilters ? " encontrado" : ""}
          </p>
        </div>
      </section>

      {/* ── Layout com Filtros + Produtos ─────────────────── */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
          {/* ════════════════════════════════════════════════ */}
          {/* SIDEBAR: FilterPanel                            */}
          {/* ════════════════════════════════════════════════ */}
          <aside className="hidden lg:block">
            <FilterPanel
              categories={filterData.categories}
              colors={filterData.colors}
              sizes={filterData.sizes}
              priceRange={filterData.priceRange}
              initialFilters={{
                categories: filterOptions.categories,
                colors: filterOptions.colors,
                sizes: filterOptions.sizes,
                priceMin: filterOptions.priceMin?.toString(),
                priceMax: filterOptions.priceMax?.toString(),
              }}
              basePath="/loja"
            />
          </aside>

          {/* ════════════════════════════════════════════════ */}
          {/* MAIN: Produtos                                 */}
          {/* ════════════════════════════════════════════════ */}
          {filteredProducts.length > 0 ? (
            <section className="space-y-6">
              {/* Barra: contagem + ordenação */}
              <div
                className="flex items-center justify-between gap-4
                           pb-5 border-b border-sand/20">
                <p className="text-sm text-plum-dark/40 hidden sm:block">
                  {total} produto{total !== 1 ? "s" : ""}
                </p>
                <Suspense
                  fallback={
                    <div className="h-9 w-44 bg-sand/20 rounded-xl animate-pulse" />
                  }>
                  <SortSelect
                    currentSort={sortBy}
                    basePath="/loja"
                  />
                </Suspense>
              </div>

              {/* Grid de produtos */}
              <div
                className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4
                           md:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            </section>
          ) : (
            <section className="col-span-full py-16 text-center">
              <p className="text-plum-dark/50">
                Nenhum produto encontrado. Tente ajustar seus filtros.
              </p>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
