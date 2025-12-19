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

  return (
    <section className="first-screen relative w-full bg-white text-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 lg:py-16 h-[80vh] lg:h-[85vh] relative">
        {/* Redes sociais (esquerda) - visível apenas em telas grandes */}
        <div className="hidden lg:flex flex-col items-center gap-2 text-[12px] font-medium text-plum-dark/80 absolute left-0 top-1/2 -translate-y-1/2 z-30 tracking-widest">
          {SOCIAL_LINKS.map((social, idx) => (
            <div
              key={social.id}
              className="flex flex-col items-center gap-1">
              {/* separador vertical entre os botões */}
              {idx !== 0 && (
                <span
                  className="h-4 w-px bg-sand/60"
                  aria-hidden
                />
              )}
              {/* link externo: nova aba + rel seguro */}
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-9 h-9 rounded-full bg-white/90 border border-plum-dark/10 flex items-center justify-center hover:bg-plum-dark/5 transition-colors focus:outline-none focus:ring-2 focus:ring-plum-dark/30">
                <span className="sr-only">{social.label}</span>
                {/* ícone react-icons com classe para controlar cor/tamanho via Tailwind */}
                <social.Icon
                  className="w-4 h-4 text-plum-dark/80"
                  aria-hidden="true"
                />
              </a>
            </div>
          ))}
        </div>

        {/* Grid principal: imagem + conteúdo */}
        <div className="grid lg:grid-cols-[52%_48%] gap-10 h-full relative">
          {/* Área da imagem: slides posicionados absoluto dentro do container */}
          <div className="relative rounded-2xl overflow-hidden shadow-sm bg-rose-soft/50">
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
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 720px"
                  />
                </div>
              );
            })}
          </div>

          {/* Conteúdo textual do lado direito */}
          <div className="relative flex items-center">
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 hero-dot-grid opacity-80 pointer-events-none"
              style={{ width: "50%", height: "50%" }}
              aria-hidden
            />
            <div className="relative z-10 space-y-6 max-w-xl">
              <span className="category-subtitle block text-xs tracking-[0.3em] uppercase text-plum-dark/60">
                <b>New</b> Collection
              </span>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-tight">
                Meet New
                <br />
                Fashion Week
              </h1>

              {/* botão que usa next/link para navegação interna */}
              <Link
                href={SLIDES[currentSlide].buttonLink}
                className="inline-block">
                <span className="px-6 py-3 bg-plum-dark text-white text-sm uppercase tracking-wide font-semibold hover:bg-sage transition-colors">
                  {SLIDES[currentSlide].buttonText}
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Contador inferior esquerdo */}
        <div className="absolute bottom-6 left-6 lg:left-2 text-3xl font-semibold text-black tracking-tight flex items-baseline gap-1">
          <span>{currentSlide + 1}</span>
          <span className="text-base text-plum-dark/70">/{SLIDES.length}</span>
        </div>

        {/* Navegação inferior direita (prev / next) */}
        <div className="absolute bottom-6 right-6 flex items-center gap-4">
          <button
            onClick={prevSlide}
            className="hero-nav-arrow"
            aria-label="Slide anterior">
            <span className="block w-3 h-3 border-l border-b border-current -rotate-45" />
          </button>
          <button
            onClick={nextSlide}
            className="hero-nav-arrow"
            aria-label="Próximo slide">
            <span className="block w-3 h-3 border-r border-t border-current rotate-45" />
          </button>
        </div>

        {/* Navegação mobile simplificada */}
        <div className="lg:hidden absolute bottom-4 left-0 right-0 flex items-center justify-center gap-4">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full border border-plum-dark/30 flex items-center justify-center bg-white/90"
            aria-label="Anterior">
            <span className="block w-3 h-3 border-l border-b border-current -rotate-45" />
          </button>

          <div className="text-sm font-medium text-black bg-white/90 px-4 py-2 rounded-full shadow-sm">
            {currentSlide + 1}/{SLIDES.length}
          </div>

          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full border border-plum-dark/30 flex items-center justify-center bg-white/90"
            aria-label="Próximo">
            <span className="block w-3 h-3 border-r border-t border-current rotate-45" />
          </button>
        </div>
      </div>
    </section>
  );
}
