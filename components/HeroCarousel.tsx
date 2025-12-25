"use client";

import { useState, useEffect, ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
/* react-icons */
import {
  SiFacebook,
  SiInstagram,
  SiPinterest,
  SiTiktok,
  SiX,
} from "react-icons/si";

/*
  HeroCarousel.tsx
  - Carousel principal com navegação e links sociais à esquerda.
  - Troquei lucide-react por react-icons/si para ter o ícone do TikTok.
  - Boas práticas: tipagem, aria, links externos seguros, autoplay com cleanup.
*/

/* Tipagem do slide (evita erros e melhora autocompletar) */
interface Slide {
  id: number;
  subtitle: string;
  title: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  bgColor: string;
}

/* Slides estáticos usados pelo componente */
const SLIDES: Slide[] = [
  {
    id: 1,
    subtitle: "Descubra a Nova Semana de Moda",
    title: "Fashion Week",
    buttonText: "Shop Now",
    buttonLink: "/shop",
    image: "/images/hero/hero-img-01.jpg",
    bgColor: "bg-rose-soft",
  },
  {
    id: 2,
    subtitle: "Beleza & Cuidados",
    title: "Hair Care",
    buttonText: "Explore",
    buttonLink: "/shop?category=cabelos",
    image: "/images/hero/hero-img-02.jpg",
    bgColor: "bg-sage",
  },
  {
    id: 3,
    subtitle: "Nova Coleção",
    title: "Beauty & Style",
    buttonText: "Descobrir",
    buttonLink: "/shop",
    image: "/images/hero/hero-img-03.jpg",
    bgColor: "bg-plum-dark",
  },
];

/* 
  Links sociais:
  - Cada item referencia um componente do react-icons (Simple Icons).
  - Icon é tipado como ComponentType<any> para aceitar props padrão.
*/
const SOCIAL_LINKS: {
  id: string;
  href: string;
  label: string;
  Icon: ComponentType<any>;
}[] = [
  {
    id: "facebook",
    href: "https://www.facebook.com/belezuura",
    label: "Facebook",
    Icon: SiFacebook,
  },
  { id: "x", href: "https://x.com/belezuura", label: "X", Icon: SiX },
  {
    id: "instagram",
    href: "https://www.instagram.com/belezuurastore/",
    label: "Instagram",
    Icon: SiInstagram,
  },
  {
    id: "pinterest",
    href: "https://br.pinterest.com/belezuura/",
    label: "Pinterest",
    Icon: SiPinterest,
  },
  {
    id: "tiktok",
    href: "https://www.tiktok.com/@belezuuraoficial",
    label: "TikTok",
    Icon: SiTiktok,
  },
];

/* Componente principal exportado */
export default function HeroCarousel() {
  // estado controlando o slide atual
  const [currentSlide, setCurrentSlide] = useState(0);

  // avança para o próximo slide (usa callback para garantir valor atualizado)
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);

  // volta para o slide anterior
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  /*
    autoplay do carousel:
    - setInterval com atualização via callback
    - cleanup com clearInterval
  */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const activeSlide = SLIDES[currentSlide];

  return (
    <section className="first-screen relative w-full bg-white text-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 py-12 lg:py-20">
        <div className="relative lg:pl-20">
          {/* Redes sociais (esquerda) */}
          <div className="hidden lg:flex flex-col items-center gap-3 text-[11px] font-semibold text-black/60 absolute left-0 top-1/2 -translate-y-1/2 z-30 tracking-[0.5em]">
            {SOCIAL_LINKS.map((social, idx) => (
              <div
                key={social.id}
                className="flex flex-col items-center gap-2">
                {idx !== 0 && (
                  <span
                    className="h-8 w-px bg-black/10"
                    aria-hidden
                  />
                )}
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center bg-white/80 hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-black/30">
                  <span className="sr-only">{social.label}</span>
                  <social.Icon
                    className="w-4 h-4 text-black/70"
                    aria-hidden="true"
                  />
                </a>
                <span className="tracking-[0.6em] text-[10px] uppercase">
                  {social.label.slice(0, 2)}
                </span>
              </div>
            ))}
          </div>

          <div className="relative lg:ml-16">
            <div className="relative w-full aspect-[16/9] min-h-[420px] max-h-[680px] rounded-[32px] overflow-hidden shadow-2xl bg-rose-soft/30">
              {SLIDES.map((slide, index) => {
                const isActive = index === currentSlide;
                return (
                  <div
                    key={slide.id}
                    className={`main-slider__item ${
                      isActive ? "is-active" : ""
                    } absolute inset-0`}
                    aria-hidden={!isActive}>
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      priority={index === 0}
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 960px"
                    />
                  </div>
                );
              })}

              <div
                className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-l from-white/85 via-white/35 to-transparent"
                aria-hidden
              />

              <div
                className="hero-dot-grid absolute top-10 right-12 w-32 h-32 opacity-40 pointer-events-none hidden md:block"
                aria-hidden
              />

              {/* Conteúdo sobre a imagem */}
              <div className="absolute inset-0 z-20 flex flex-col justify-between px-6 sm:px-10 lg:px-16 py-8">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.5em] text-black/50">
                  <span>{activeSlide.subtitle}</span>
                  <span className="hidden sm:inline-flex items-center gap-2 text-[10px] tracking-[0.6em]">
                    Scroll Down
                    <span
                      className="block w-5 h-px bg-black/20"
                      aria-hidden
                    />
                  </span>
                </div>

                <div className="ml-auto w-full lg:w-[45%] text-right space-y-6">
                  <h1 className="text-4xl sm:text-5xl xl:text-6xl font-semibold leading-[1.05] text-black">
                    {activeSlide.title}
                  </h1>
                  <Link
                    href={activeSlide.buttonLink}
                    className="inline-flex items-center justify-center px-7 py-3 bg-black text-white text-sm tracking-[0.4em] uppercase font-semibold shadow-md hover:bg-black/80 transition-colors">
                    {activeSlide.buttonText}
                  </Link>
                </div>

                <div className="flex items-center justify-between text-black">
                  <div className="flex items-baseline gap-1 text-3xl font-semibold">
                    <span>{currentSlide + 1}</span>
                    <span className="text-base text-black/50">
                      /{SLIDES.length}
                    </span>
                  </div>

                  <div className="hidden sm:flex items-center gap-4">
                    <button
                      onClick={prevSlide}
                      className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center bg-white/80 hover:bg-white/95 transition-colors"
                      aria-label="Slide anterior">
                      <span className="block w-3 h-3 border-l border-b border-current -rotate-45" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center bg-white/80 hover:bg-white/95 transition-colors"
                      aria-label="Próximo slide">
                      <span className="block w-3 h-3 border-r border-t border-current rotate-45" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Navegação mobile */}
              <div className="sm:hidden absolute bottom-4 left-0 right-0 flex items-center justify-center gap-4 z-30">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center bg-white/90"
                  aria-label="Anterior">
                  <span className="block w-3 h-3 border-l border-b border-current -rotate-45" />
                </button>
                <div className="text-xs font-semibold tracking-[0.4em] text-black bg-white/80 px-4 py-2 rounded-full shadow-sm">
                  {currentSlide + 1}/{SLIDES.length}
                </div>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center bg-white/90"
                  aria-label="Próximo">
                  <span className="block w-3 h-3 border-r border-t border-current rotate-45" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
