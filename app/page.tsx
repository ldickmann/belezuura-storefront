import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/services/products";
import HeroCarousel from "@/components/HeroCarousel";
import CollectionsSection from "@/components/ColletionsSection";

export default async function Home() {
  const products = await getProducts(4);

  return (
    <>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Collections Section */}
      <CollectionsSection />

      {/* Produtos em Destaque */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-plum-dark text-center mb-12 font-serif">
            Destaques
          </h2>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="group">
                  <Link href={`/produto/${product.slug}`}>
                    <div className="aspect-3/4 bg-rose-soft rounded-lg overflow-hidden mb-4 relative">
                      {product.media[0]?.url && (
                        <Image
                          src={product.media[0].url}
                          alt={product.media[0].alt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <h3 className="text-plum-dark font-medium group-hover:text-sage transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-plum-dark/60 text-sm">
                      {product.price.formatted}
                    </p>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-center text-plum-dark/60">
              Carregando produtos...
            </p>
          )}
        </div>
      </section>
    </>
  );
}
