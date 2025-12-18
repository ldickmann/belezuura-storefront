import Link from "next/link";
import { getProducts } from "@/lib/services/products";

export default async function Home() {
  const products = await getProducts(4);

  return (
    <>
      {/* Hero */}
      <section className="bg-rose-soft py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl text-plum-dark mb-6 font-serif">
            Elegância que <span className="text-sage">Transcende</span> o Tempo
          </h1>
          <p className="text-plum-dark/70 text-lg max-w-2xl mx-auto mb-8">
            Descubra peças exclusivas de alfaiataria e cosméticos premium.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/alfaiataria"
              className="px-8 py-3 bg-plum-dark text-rose-soft rounded uppercase text-sm tracking-wider hover:bg-plum-dark/90 transition-colors">
              Ver Alfaiataria
            </Link>
            <Link
              href="/cosmeticos"
              className="px-8 py-3 border border-plum-dark text-plum-dark rounded uppercase text-sm tracking-wider hover:bg-plum-dark hover:text-rose-soft transition-colors">
              Ver Cosméticos
            </Link>
          </div>
        </div>
      </section>

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
                    <div className="aspect-[3/4] bg-rose-soft rounded-lg overflow-hidden mb-4">
                      {product.media[0]?.url && (
                        <img
                          src={product.media[0].url}
                          alt={product.media[0].alt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
