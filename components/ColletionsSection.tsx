import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * Interface para definir a estrutura de cada coleção
 */
type Collection = {
  id: string;
  bg: string;
  category: string;
  subtitleBold?: string;
  subtitleText?: string;
  title: React.ReactNode;
  text?: string;
  href?: string;
  variant?: "collection" | "season";
};

/**
 * Dados das coleções exibidas na seção
 * @constant
 */
const COLLECTIONS: Collection[] = [
  {
    id: "c1",
    bg: "/images/collections-image_1.jpg",
    category: "accessories",
    subtitleBold: "new",
    subtitleText: "accessories",
    title: (
      <>
        Fashion for <br />
        this summer
      </>
    ),
    href: "/shop",
    variant: "collection",
  },
  {
    id: "s1",
    bg: "/images/collections-image_2.jpg",
    category: "",
    title: (
      <>
        season <span>sale</span>
      </>
    ),
    text: "Non aliqua reprehenderit reprehenderit culpa laboris nulla",
    href: "/shop",
    variant: "season",
  },
  {
    id: "c2",
    bg: "/images/collections-image_3.jpg",
    category: "sweters",
    subtitleBold: "men",
    subtitleText: "collection",
    title: (
      <>
        new Autumn <br />
        arrivals 2020
      </>
    ),
    href: "/shop",
    variant: "collection",
  },
  {
    id: "c3",
    bg: "/images/collections-image_4.jpg",
    category: "dresses",
    subtitleBold: "women",
    subtitleText: "collection",
    title: (
      <>
        Trendy look <br />
        for every day
      </>
    ),
    href: "/shop",
    variant: "collection",
  },
];

/**
 * Componente CollectionsSection
 *
 * Exibe uma grade de coleções com dois estilos visuais diferentes:
 * - "season": Layout promocional com fundo de imagem completo
 * - "collection": Layout dividido com imagem e conteúdo lado a lado
 *
 * Inclui contadores de produtos e clientes satisfeitos com padrão de pontos decorativo.
 *
 * @returns {JSX.Element} Seção de coleções
 */
export default function CollectionsSection() {
  return (
    <section className="collection-block wrapper relative text-plum-dark">
      <div className="collection-block__content">
        <div className="collections">
          {/* Topo - Contador de Produtos */}
          <div className="collections__top">
            <div className="collections__max relative flex justify-center items-center">
              {/* Padrão de pontos decorativo atrás do contador */}
              <div
                aria-hidden="true"
                className="dots-pattern dots-pattern--md absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 pointer-events-none z-0"
              />

              {/* Título com contador */}
              <h3 className="collection-title text-plum-dark relative z-10">
                <span className="collection-title__count">2587</span>
                <span className="collection-title__plus">+</span>
                <span className="collection-title__text">Products for you</span>
              </h3>
            </div>
          </div>

          {/* Grid de Coleções */}
          <div className="collections__grid space-y-6">
            {COLLECTIONS.map((col) =>
              col.variant === "season" ? (
                // Layout para promoções sazonais
                <article
                  key={col.id}
                  className="season-sale relative overflow-hidden rounded-lg">
                  <div
                    className="season-sale__all relative"
                    style={{
                      backgroundImage: `url(${col.bg})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}>
                    <div className="season-sale__row">
                      <div className="season-sale__cell">
                        {/* Conteúdo com fundo translúcido */}
                        <div className="season-sale__content p-6 md:p-10 bg-white/10 backdrop-blur-sm rounded">
                          <h4 className="season-sale__title text-2xl font-serif text-white/90">
                            {col.title}
                          </h4>
                          {col.text && (
                            <p className="season-sale__text mt-2 text-white/80">
                              {col.text}
                            </p>
                          )}
                          <Link
                            href={col.href ?? "#"}
                            className="season-sale__more read-more inline-block mt-4 text-white hover:text-white/80 transition-colors">
                            Shop now
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Link cobrindo toda a área clicável */}
                    <Link
                      href={col.href ?? "#"}
                      className="season-sale__link absolute inset-0"
                    />
                  </div>
                </article>
              ) : (
                // Layout para coleções regulares
                <article
                  key={col.id}
                  className="collection collection_1 relative overflow-hidden rounded-lg">
                  <div className="collection__all relative grid md:grid-cols-2">
                    {/* Coluna da Imagem */}
                    <div className="collection__mob-image md:col-span-1">
                      <div
                        className="collection__image w-full h-48 md:h-full bg-center bg-cover"
                        style={{ backgroundImage: `url(${col.bg})` }}
                        aria-hidden="true"
                      />
                      {col.category && (
                        <span className="collection__category block mt-2 text-plum-dark/80">
                          {col.category}
                        </span>
                      )}
                    </div>

                    {/* Coluna do Conteúdo */}
                    <div className="collection__row md:col-span-1 flex items-center">
                      <div className="collection__cell p-6 md:p-10">
                        <div className="collection__content">
                          {/* Subtítulo */}
                          {col.subtitleText && (
                            <span className="collection__subtitle category-subtitle block text-sm uppercase text-plum-dark/70">
                              <b>{col.subtitleBold}</b> {col.subtitleText}
                            </span>
                          )}

                          {/* Título da Coleção */}
                          <h4 className="collection__title text-2xl md:text-3xl font-serif mt-2 text-plum-dark">
                            {col.title}
                          </h4>

                          {/* Link de Ação */}
                          <Link
                            href={col.href ?? "#"}
                            className="collection__more read-more inline-block mt-4">
                            Shop now
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Link cobrindo toda a área clicável */}
                    <Link
                      href={col.href ?? "#"}
                      className="collection__link absolute inset-0"
                    />
                  </div>
                </article>
              )
            )}
          </div>

          {/* Rodapé - Contador de Clientes Satisfeitos */}
          <div className="collections__bottom mt-8">
            <div className="collections__max relative flex justify-center items-center">
              {/* Padrão de pontos decorativo */}
              <div
                aria-hidden="true"
                className="dots-pattern dots-pattern--md absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 pointer-events-none z-0"
              />

              {/* Título com contador */}
              <h3 className="collection-title text-plum-dark relative z-10">
                <span className="collection-title__count">5649</span>
                <span className="collection-title__plus">+</span>
                <span className="collection-title__text">
                  Satisfied clients
                </span>
              </h3>
            </div>
          </div>
        </div>

        {/* Botão para Ver Todas as Coleções */}
        <div className="load-more mt-8">
          <Link
            href="/collections"
            className="button inline-block">
            <span className="button__text">View all collections</span>
          </Link>
        </div>
      </div>

      {/* Vetores Decorativos de Fundo */}
      <Image
        src="/images/svg/vector-collections.svg"
        alt=""
        width={200}
        height={200}
        className="collection-block__bg-left absolute left-0 top-1/2 -translate-y-1/2 opacity-80"
      />
      <Image
        src="/images/svg/vector-collections.svg"
        alt=""
        width={200}
        height={200}
        className="collection-block__bg-right absolute right-0 top-1/2 -translate-y-1/2 opacity-80"
      />
    </section>
  );
}
