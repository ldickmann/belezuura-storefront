import Image from "next/image";
import Link from "next/link";
import React from "react";

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

export default function CollectionsSection() {
  return (
    <section className="collection-block wrapper relative bg-white text-black">
      <div className="collection-block__content">
        <div className="collections">
          <div className="collections__top">
            <div className="collections__max relative flex justify-center items-center">
              {/* Dots pattern atrás do contador */}
              <div
                aria-hidden="true"
                className="dots-pattern dots-pattern--md absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 pointer-events-none z-0"
              />
              <h3 className="collection-title text-black relative z-10">
                <span className="collection-title__count">2587</span>
                <span className="collection-title__plus">+</span>
                <span className="collection-title__text">Products for you</span>
              </h3>
            </div>
          </div>

          <div className="collections__grid space-y-6">
            {COLLECTIONS.map((col) =>
              col.variant === "season" ? (
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
                        <div className="season-sale__content p-6 md:p-10 bg-white/10 backdrop-blur-sm rounded">
                          <h4 className="season-sale__title text-2xl font-serif text-black">
                            {col.title}
                          </h4>
                          {col.text && (
                            <p className="season-sale__text mt-2 text-black">
                              {col.text}
                            </p>
                          )}
                          <Link
                            href={col.href ?? "#"}
                            className="season-sale__more read-more inline-block mt-4 text-black">
                            Shop now
                          </Link>
                        </div>
                      </div>
                    </div>
                    <Link
                      href={col.href ?? "#"}
                      className="season-sale__link absolute inset-0"
                    />
                  </div>
                </article>
              ) : (
                <article
                  key={col.id}
                  className="collection collection_1 relative overflow-hidden rounded-lg">
                  <div className="collection__all relative grid md:grid-cols-2">
                    <div className="collection__mob-image md:col-span-1">
                      {/* imagem como background para mobile/desktop */}
                      <div
                        className="collection__image w-full h-48 md:h-full bg-center bg-cover"
                        style={{ backgroundImage: `url(${col.bg})` }}
                        aria-hidden="true"
                      />
                      {col.category && (
                        <span className="collection__category block mt-2 text-black">
                          {col.category}
                        </span>
                      )}
                    </div>

                    <div className="collection__row md:col-span-1 flex items-center">
                      <div className="collection__cell p-6 md:p-10">
                        <div className="collection__content">
                          {col.subtitleText && (
                            <span className="collection__subtitle category-subtitle block text-sm uppercase text-black">
                              <b>{col.subtitleBold}</b> {col.subtitleText}
                            </span>
                          )}
                          <h4 className="collection__title text-2xl md:text-3xl font-serif mt-2 text-black">
                            {col.title}
                          </h4>
                          <Link
                            href={col.href ?? "#"}
                            className="collection__more read-more inline-block mt-4">
                            Shop now
                          </Link>
                        </div>
                      </div>
                    </div>

                    <Link
                      href={col.href ?? "#"}
                      className="collection__link absolute inset-0"
                    />
                  </div>
                </article>
              )
            )}
          </div>

          <div className="collections__bottom mt-8">
            <div className="collections__max relative flex justify-center items-center">
              {/* Dots pattern atrás do contador */}
              <div
                aria-hidden="true"
                className="dots-pattern dots-pattern--md absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 pointer-events-none z-0"
              />
              <h3 className="collection-title text-black relative z-10">
                <span className="collection-title__count">5649</span>
                <span className="collection-title__plus">+</span>
                <span className="collection-title__text">
                  Satisfied clients
                </span>
              </h3>
            </div>
          </div>
        </div>

        <div className="load-more mt-8">
          <Link
            href="/collections"
            className="button inline-block">
            <span className="button__text">View all collections</span>
          </Link>
        </div>
      </div>

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
