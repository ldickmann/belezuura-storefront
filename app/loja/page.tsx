/**
 * Página da Loja — /loja
 *
 * Catálogo completo de produtos com ordenação.
 * Server Component — dados buscados via Wix Stores API.
 *
 * Reutiliza os mesmos componentes visuais de /search
 * com ordenação em memória via sortProducts().
 */

import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { searchProducts } from "@/lib/services/products";
import type { Product, SortOption } from "@/lib/services/products";
import { SortSelect } from "@/components/search/SortSelect";

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
  searchParams: Promise<{ sort?: string }>;
}) {
  const { sort } = await searchParams;
  const sortBy = parseSort(sort);

  // Busca todos os produtos sem filtro de texto
  const { items: products, total } = await searchProducts({
    sortBy,
    limit: 60,
  });

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
          </p>
        </div>
      </section>

      {/* ── Conteúdo ──────────────────────────────────────── */}
      <div className="container mx-auto px-4 py-8">
        {products.length > 0 ? (
          <>
            {/* Barra: contagem + ordenação */}
            <div
              className="flex items-center justify-between gap-4 mb-6
                         pb-5 border-b border-sand/20">
              <p className="text-sm text-plum-dark/40 hidden sm:block">
                {total} produto{total !== 1 ? "s" : ""}
              </p>
              {/*
               * basePath="/loja" garante que ao mudar o sort a URL
               * permanece em /loja?sort=... e não navega para /search
               */}
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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="py-24 text-center">
            <p className="text-plum-dark/30 text-sm">
              Nenhum produto disponível no momento.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
