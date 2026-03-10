/**
 * Página de produto individual
 *
 * Server Component — busca produto por slug via Wix Stores API.
 */

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getProductBySlug } from "@/lib/services/products";

// ─────────────────────────────────────────────────────────────
// Metadata dinâmica
// ─────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Produto não encontrado | Belezuura" };
  return {
    title: `${product.name} | Belezuura`,
    description: product.description || `Compre ${product.name} na Belezuura`,
  };
}

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const mainImage = product.media[0];

  return (
    <main className="container mx-auto px-4 py-10 max-w-5xl">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-8">
        <ol className="flex items-center gap-2 text-[13px] text-plum-dark/40">
          <li>
            <Link
              href="/"
              className="hover:text-plum-dark transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link
              href="/search"
              className="hover:text-plum-dark transition-colors">
              Loja
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-plum-dark font-medium truncate max-w-45">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Layout principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        {/* ── Galeria de imagens ─────────────────────────── */}
        <div className="space-y-3">
          {/* Imagem principal */}
          <div className="relative aspect-3/4 bg-rose-soft rounded-2xl overflow-hidden">
            {mainImage?.url ? (
              <Image
                src={mainImage.url}
                alt={mainImage.alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-rose-soft dots-pattern--sm" />
            )}

            {/* Badge esgotado */}
            {!product.inStock && (
              <div className="absolute top-3 left-3">
                <span
                  className="bg-plum-dark/80 text-rose-soft px-2.5 py-1 rounded-lg
                             text-[11px] font-semibold tracking-wide uppercase">
                  Esgotado
                </span>
              </div>
            )}
          </div>

          {/* Miniaturas */}
          {product.media.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.media.map((m, i) => (
                <div
                  key={i}
                  className="relative shrink-0 w-20 h-24 bg-rose-soft rounded-xl overflow-hidden
                             ring-1 ring-sand/40">
                  <Image
                    src={m.url}
                    alt={m.alt}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Informações do produto ─────────────────────── */}
        <div className="flex flex-col">
          {/* Nome */}
          <h1 className="font-serif text-2xl md:text-3xl text-plum-dark leading-snug mb-3">
            {product.name}
          </h1>

          {/* Preço */}
          <p className="text-2xl font-semibold text-plum-dark mb-6">
            {product.price.formatted}
          </p>

          {/* Descrição */}
          {product.description && (
            <div
              className="text-[14px] text-plum-dark/65 leading-relaxed mb-8
                         prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          )}

          {/* Botão de compra */}
          <div className="mt-auto space-y-3">
            <button
              disabled={!product.inStock}
              className="w-full h-13 flex items-center justify-center
                         bg-plum-dark text-rose-soft rounded-2xl
                         text-sm font-semibold tracking-wide
                         hover:bg-plum-dark/90 transition-colors
                         disabled:opacity-40 disabled:cursor-not-allowed">
              {product.inStock ? "Adicionar à sacola" : "Produto esgotado"}
            </button>

            <button
              disabled={!product.inStock}
              className="w-full h-13 flex items-center justify-center
                         ring-1 ring-inset ring-plum-dark/25 rounded-2xl
                         text-sm font-semibold text-plum-dark
                         hover:bg-plum-dark/5 transition-colors
                         disabled:opacity-40 disabled:cursor-not-allowed">
              Comprar agora
            </button>
          </div>

          {/* Info de entrega */}
          <p className="mt-5 text-[12px] text-plum-dark/35 text-center">
            🚚 Frete grátis em compras acima de R$ 299
          </p>
        </div>
      </div>
    </main>
  );
}
