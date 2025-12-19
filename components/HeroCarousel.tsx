"use client";

import { useState, useEffect, JSX } from "react";
import Image from "next/image";
import Link from "next/link";

/*
  Componente: HeroCarousel
  - Carousel de hero com navegação e links sociais à esquerda.
  - Comentários em todo o arquivo com boas práticas e pequenas correções.
*/

/* Tipagem do slide (bom para autocompletar e evitar erros) */
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
  - URLs fornecidas pelo usuário foram aplicadas.
  - Cada item tem um Icon que retorna SVG inline (acessível).
  - Os ícones serão renderizados dentro de um wrapper arredondado (botão) para corrigir o layout.
*/
const SOCIAL_LINKS: {
  id: string;
  href: string;
  label: string;
  Icon: () => JSX.Element;
}[] = [
  {
    id: "facebook",
    href: "https://www.facebook.com/belezuura",
    label: "Facebook",
    Icon: () => (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="w-4 h-4 text-plum-dark/80"
        fill="currentColor">
        <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 4.99 3.66 9.13 8.44 9.94v-7.03H8.9v-2.91h1.54V9.41c0-1.52.9-2.36 2.28-2.36.66 0 1.34.12 1.34.12v1.48h-.76c-.75 0-.98.46-.98.93v1.12h1.67l-.27 2.91h-1.4V22c4.78-.81 8.44-4.95 8.44-9.93z" />
      </svg>
    ),
  },
  {
    id: "x",
    href: "https://x.com/belezuura",
    label: "X",
    Icon: () => (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="w-4 h-4 text-plum-dark/80"
        fill="currentColor">
        <path d="M21.64 7.03c-.26.58-.6 1.1-1.05 1.56.48-.05.95-.18 1.38-.39-.46.5-.99.92-1.58 1.26-.45.28-.94.5-1.46.66-.5.15-1.02.25-1.55.29-.56.04-1.12.03-1.68-.05-1.12-.16-2.18-.54-3.14-1.12-.98-.59-1.85-1.35-2.57-2.25-.7-.88-1.24-1.9-1.57-3.01-.35-1.15-.39-2.38-.12-3.56.28-1.22.88-2.34 1.74-3.27" />
      </svg>
    ),
  },
  {
    id: "instagram",
    href: "https://www.instagram.com/belezuurastore/",
    label: "Instagram",
    Icon: () => (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="w-4 h-4 text-plum-dark/80"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
        />
        <circle
          cx="12"
          cy="12"
          r="3.2"
        />
        <circle
          cx="17.5"
          cy="6.5"
          r="0.6"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    ),
  },
  {
    id: "pinterest",
    href: "https://br.pinterest.com/belezuura/",
    label: "Pinterest",
    Icon: () => (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="w-4 h-4 text-plum-dark/80"
        fill="currentColor">
        <path d="M12.04 2C7.48 2 4 5.48 4 10.04c0 2.93 1.62 5.44 4.01 6.67-.06.57-.34 2.06-.63 2.9 0 0-.1.39-.15.57-.24.9-.11 1.33.59 1.44.67.11 1.95-.44 2.56-.78.74.2 1.5.31 2.31.31 4.56 0 8.04-3.48 8.04-8.04C20.08 5.48 16.6 2 12.04 2zm.66 11.9c-.3 1.87-1.36 3.5-3.44 3.5-1.04 0-1.82-.86-1.6-1.95.27-1.34.99-3.15.99-4.24 0-1.09-.59-1.91-1.8-1.91C6.2 8.3 5 9.76 5 11.95c0 3 2.18 6.03 5.78 6.03 3.4 0 5.75-2.66 5.75-6.35 0-2.74-1.83-4.67-4.43-4.67-2.96 0-4.4 2.42-4.4 4.28 0 1.1.42 2.08.98 2.73.27.3.3.42.21.77z" />
      </svg>
    ),
  },
  {
    id: "tiktok",
    href: "https://www.tiktok.com/@belezuuraoficial",
    label: "TikTok",
    Icon: () => (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="w-4 h-4 text-plum-dark/80"
        fill="currentColor">
        <path d="M17.5 6.5v5.2a3.3 3.3 0 1 1-3.3-3.3V6.5h3.3zM9 17.8a4.8 4.8 0 1 0 0-9.6v1.6a3.2 3.2 0 1 1 0 6.4v.6z" />
      </svg>
    ),
  },
];

/* Componente principal exportado */
export default function HeroCarousel() {
  // estado controlando o slide atual
  const [currentSlide, setCurrentSlide] = useState(0);

  // Avança para o próximo slide (usa callback para garantir valor atualizado)
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);

  // Volta para o slide anterior
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  /*
    Efeito para autoplay do carousel:
    - usa setInterval com função estável que atualiza via callback.
    - cleanup via clearInterval.
    - dependência vazia para não reiniciar o intervalo a cada render.
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
              {/* link externo abre em nova aba, com rel seguro */}
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-9 h-9 rounded-full bg-white/90 border border-plum-dark/10 flex items-center justify-center hover:bg-plum-dark/5 transition-colors focus:outline-none focus:ring-2 focus:ring-plum-dark/30">
                {/* texto escondido para leitores de tela */}
                <span className="sr-only">{social.label}</span>
                {/* ícone SVG com tamanho controlado por classes */}
                <social.Icon />
              </a>
            </div>
          ))}
        </div>

        {/* Grid principal: imagem + conteúdo */}
        <div className="grid lg:grid-cols-[52%_48%] gap-10 h-full relative">
          {/* Área da imagem: mapa de slides com posicionamento absoluto */}
          <div className="relative rounded-2xl overflow-hidden shadow-sm bg-rose-soft/50">
            {SLIDES.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <div
                  key={slide.id}
                  // classe controlando visibilidade do slide ativo
                  className={`main-slider__item ${
                    isActive ? "is-active" : ""
                  } absolute inset-0`}>
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
              aria-hidden></div>

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
            className="w-10 h-10 rounded-full border border-plum-dark/30 flex items-center justify-center bg-white/90">
            <span className="block w-3 h-3 border-l border-b border-current -rotate-45" />
          </button>
          <div className="text-sm font-medium text-black bg-white/90 px-4 py-2 rounded-full shadow-sm">
            {currentSlide + 1}/{SLIDES.length}
          </div>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full border border-plum-dark/30 flex items-center justify-center bg-white/90">
            <span className="block w-3 h-3 border-r border-t border-current rotate-45" />
          </button>
        </div>
      </div>
    </section>
  );
}
