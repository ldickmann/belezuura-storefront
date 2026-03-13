/**
 * Página de resultados de busca — /search?q=termo&sort=price_asc
 *
 * Server Component: busca produtos via Wix Stores API.
 * Query e ordenação vivem na URL para suportar compartilhamento
 * e navegação pelo histórico do browser sem estado cliente.
 *
 * Fluxo:
 *   - Sem ?q= → redireciona para /loja (catálogo completo)
 *   - Com ?q= e resultados → grid de produto
 *   - Com ?q= e sem resultados → EmptyState com sugestões
 */

import { redirect } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { SearchX, TrendingUp } from "lucide-react";
import type { Metadata } from "next";
import { searchProducts, getProducts } from "@/lib/services/products";
import type { Product, SortOption } from "@/lib/services/products";
import { SortSelect } from "@/components/search/SortSelect";

// ─────────────────────────────────────────────────────────────
// Utils
// ─────────────────────────────────────────────────────────────

const VALID_SORTS: SortOption[] = [
  "relevance",
  "price_asc",
  "price_desc",
  "name_asc",
];

/** Valida e converte o param ?sort= para SortOption segura. */
function parseSort(value?: string): SortOption {
  if (VALID_SORTS.includes(value as SortOption)) return value as SortOption;
  return "relevance";
}

// ─────────────────────────────────────────────────────────────
// Metadata dinâmica
// ─────────────────────────────────────────────────────────────

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `"${q}" — Busca | Belezuura` : "Busca | Belezuura",
    description: q
      ? `Resultados para "${q}" na Belezuura`
      : "Encontre os melhores produtos de beleza na Belezuura",
  };
}

// ─────────────────────────────────────────────────────────────
// ProductCard — exibição individual no grid
// ─────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group">
      <Link
        href={`/produto/${product.slug}`}
        className="block">
        {/* Imagem do produto */}
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
            // Placeholder com padrão de pontos da identidade visual
            <div className="w-full h-full bg-rose-soft dots-pattern--sm" />
          )}

          {/* Badge de estoque esgotado */}
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

        {/* Nome e preço */}
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
// EmptyState — nenhum resultado encontrado para a query
// ─────────────────────────────────────────────────────────────

/**
 * Exibido quando a busca não retorna produtos.
 * Busca 4 sugestões da API em paralelo com a renderização da seção.
 */
async function EmptyState({ query }: { query: string }) {
  const suggestions = await getProducts(4);
  const quickTerms = ["Vestidos", "Maquiagem", "Skincare", "Conjuntos"];

  return (
    <div className="py-16 text-center">
      {/* Ícone ilustrativo */}
      <div
        className="inline-flex items-center justify-center w-20 h-20 rounded-full
                   bg-rose-soft mb-6">
        <SearchX
          size={32}
          className="text-plum-dark/30"
        />
      </div>

      <h2 className="font-serif text-2xl text-plum-dark mb-2">
        Nenhum resultado para &ldquo;{query}&rdquo;
      </h2>
      <p className="text-plum-dark/50 text-sm max-w-sm mx-auto mb-8">
        Tente palavras diferentes ou explore algumas sugestões abaixo.
      </p>

      {/* Termos de busca rápida */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {quickTerms.map((term) => (
          <Link
            key={term}
            href={`/search?q=${encodeURIComponent(term)}`}
            className="px-4 py-2 rounded-full border border-sand/50 text-sm text-plum-dark/70
                       hover:border-plum-dark/40 hover:text-plum-dark hover:bg-rose-soft/40
                       transition-all duration-150">
            {term}
          </Link>
        ))}
      </div>

      {/* Produtos sugeridos via "Você pode gostar" */}
      {suggestions.length > 0 && (
        <div className="text-left max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp
              size={15}
              className="text-gold-warm"
            />
            <span className="text-[11px] font-bold tracking-widest text-plum-dark/40 uppercase">
              Você pode gostar
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-8">
            {suggestions.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string }>;
}) {
  const { q, sort } = await searchParams;

  const query = q?.trim() ?? "";
  const sortBy = parseSort(sort);

  // Sem query → /loja exibe o catálogo completo
  if (!query) redirect("/loja");

  const { items: products, total } = await searchProducts({
    query,
    sortBy,
    limit: 24,
  });

  return (
    <main className="min-h-[60vh]">
      {/* ── Cabeçalho com termo pesquisado e contagem ─────── */}
      <section className="bg-rose-soft/40 border-b border-sand/20 py-8 md:py-10">
        <div className="container mx-auto px-4">
          <p className="text-[11px] font-bold tracking-widest text-plum-dark/40 uppercase mb-2">
            Busca
          </p>
          <h1 className="text-2xl md:text-3xl font-serif text-plum-dark">
            &ldquo;{query}&rdquo;
          </h1>
          <p className="text-sm text-plum-dark/50 mt-1.5">
            {total === 0
              ? "Nenhum produto encontrado"
              : `${total} produto${total !== 1 ? "s" : ""} encontrado${total !== 1 ? "s" : ""}`}
          </p>
        </div>
      </section>

      {/* ── Conteúdo principal ────────────────────────────── */}
      <div className="container mx-auto px-4 py-8">
        {products.length > 0 ? (
          <>
            {/* Barra: contagem + seletor de ordenação */}
            <div
              className="flex items-center justify-between gap-4 mb-6
                         pb-5 border-b border-sand/20">
              <p className="text-sm text-plum-dark/40 hidden sm:block">
                {total} produto{total !== 1 ? "s" : ""}
              </p>
              {/*
               * SortSelect é Client Component (usa useSearchParams).
               * O Suspense boundary é obrigatório para não bloquear o
               * streaming do Server Component pai.
               */}
              <Suspense
                fallback={
                  <div className="h-9 w-44 bg-sand/20 rounded-xl animate-pulse" />
                }>
                <SortSelect
                  currentSort={sortBy}
                  basePath="/search"
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
          // Estado vazio: sugestões e termos alternativos
          <EmptyState query={query} />
        )}
      </div>
    </main>
  );
}
