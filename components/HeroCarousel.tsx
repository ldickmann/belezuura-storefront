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
  - Layout assimétrico (Desktop) e Overlay (Mobile).
  - Mobile: Texto sobre a imagem, descrição oculta, sem border-radius.
  - Desktop: Layout flex com sobreposição lateral.
*/

interface Slide {
  id: number;
  subtitle: string;
  title: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  bgColor: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    subtitle: "Sinta a liberdade dos tecidos tecnológicos da nossa linha Roupas Fitness. Estilo e suporte para o seu melhor treino.",
    title: "Conforto e Performance",
    buttonText: "VER MODA FITNESS",
    buttonLink: "/shop",
    image: "/images/hero/hero-img-01.jpg",
    bgColor: "bg-rose-soft",
  },
  {
    id: 2,
    subtitle: "Explore as novidades em Cosméticos para Cabelos. O toque final de luxo que define a sua identidade.",
    title: "A Elegância em Cada Detalhe",
    buttonText: "COSMÉTICOS DE CABELO",
    buttonLink: "/shop?category=cabelos",
    image: "/images/hero/hero-img-02.jpg",
    bgColor: "bg-sage",
  },
  {
    id: 3,
    subtitle: "Explore as novidades em Maquiagem. O toque final de luxo que define a sua identidade.",
    title: "O Poder da Sua Beleza",
    buttonText: "CONHECER LINHA COMPLETA",
    buttonLink: "/shop",
    image: "/images/hero/hero-img-03.jpg",
    bgColor: "bg-plum-dark",
  },
];

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

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const activeSlide = SLIDES[currentSlide];

  return (
    <section className="relative w-full text-plum-dark overflow-hidden py-0 lg:py-20">
      {/* Social Icons - Positioned at extreme left of section (Hidden on mobile for cleaner look or consistent) */}
      <div className="hidden lg:flex flex-col items-center gap-3 absolute left-4 top-1/2 -translate-y-1/2 z-30">
        <div className="flex flex-col items-center gap-4 text-[11px] font-semibold text-plum-dark/60 tracking-[0.5em]">
          {SOCIAL_LINKS.map((social, idx) => (
            <div key={social.id} className="flex flex-col items-center gap-2">
              {idx !== 0 && <span className="h-8 w-px bg-plum-dark/10" aria-hidden />}
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 rounded-full border border-plum-dark/15 flex items-center justify-center bg-white/80 hover:bg-plum-dark/5 transition-colors focus:outline-none focus:ring-2 focus:ring-plum-dark/30"
              >
                <social.Icon className="w-4 h-4 text-plum-dark/70" />
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full lg:max-w-[1920px] lg:mx-auto lg:px-12 relative">
        <div className="flex flex-col lg:flex-row items-center relative">
          {/* Image Container 
              Mobile: Aspect 3/4 or full height? Using aspect-[3/4] for improved verticality.
              Desktop: aspect 16/9, rounded removed.
          */}
          <div className="w-full lg:w-7/12 relative aspect-[3/4] sm:aspect-[4/3] lg:aspect-[16/9] md:min-h-[500px] overflow-hidden shadow-none lg:shadow-2xl bg-gray-100 order-1 lg:order-none">
            {SLIDES.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isActive ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                  aria-hidden={!isActive}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority={index === 0}
                    className="object-cover object-center lg:object-left"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  {/* Overlay for mobile readability: Darker on mobile, subtler on desktop */}
                  <div className="absolute inset-0 bg-black/40 lg:bg-black/5" />
                </div>
              );
            })}

            {/* Mobile Navigation Controls (inside image) */}
            <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-4 z-30 lg:hidden">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-white/40 bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Anterior"
              >
                <span className="block w-2.5 h-2.5 border-l border-b border-white -rotate-45" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border border-white/40 bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Próximo"
              >
                <span className="block w-2.5 h-2.5 border-r border-t border-white rotate-45" />
              </button>
            </div>
          </div>

          {/* Text/Content Container 
              Mobile: Absolute center overlay, white text.
              Desktop: Static side block, overlapping margin, dark text.
          */}
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-8 lg:static lg:block lg:w-5/12 lg:text-left lg:items-start lg:p-0 lg:-ml-32 lg:mt-0 pointer-events-none">

            <div className="pointer-events-auto sm:max-w-md lg:max-w-none">
              <div className="flex flex-col items-center lg:items-start space-y-4 lg:space-y-6 lg:pl-12">

                {/* Label/Subtitle Kick */}
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/80 lg:text-plum-dark/60">
                  {activeSlide.subtitle.split('.')[0]}
                </span>

                {/* Title: Big on desktop, responsive on mobile */}
                <h1 className="text-4xl sm:text-5xl xl:text-7xl font-bold leading-tight text-white lg:text-plum-dark drop-shadow-lg lg:drop-shadow-none">
                  {activeSlide.title}
                </h1>

                {/* Description: HIDDEN ON MOBILE */}
                <p className="hidden md:block text-sm sm:text-base text-plum-dark/60 max-w-md leading-relaxed">
                  {activeSlide.subtitle}
                </p>

                <div className="flex items-center gap-6 pt-4">
                  <Link
                    href={activeSlide.buttonLink}
                    className="inline-flex items-center justify-center px-8 py-3 lg:py-4 bg-white text-plum-dark lg:bg-plum-dark lg:text-white text-xs tracking-[0.2em] uppercase font-bold hover:bg-rose-soft lg:hover:bg-plum-dark/90 transition-transform hover:-translate-y-1 shadow-lg border border-transparent lg:border-none"
                  >
                    {activeSlide.buttonText}
                  </Link>

                  {/* Desktop Navigation Arrows (beside button) */}
                  <div className="hidden lg:flex items-center gap-3">
                    <button
                      onClick={prevSlide}
                      className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-full hover:bg-gray-50 transition-colors text-gray-600"
                      aria-label="Previous slide"
                    >
                      <span className="block w-2.5 h-2.5 border-l border-b border-current -rotate-45 ml-1" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-full hover:bg-gray-50 transition-colors text-gray-600"
                      aria-label="Next slide"
                    >
                      <span className="block w-2.5 h-2.5 border-r border-t border-current rotate-45 mr-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
