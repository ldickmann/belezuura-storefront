"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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

const SOCIAL_LINKS = [
  { name: "FB", href: "#", label: "Facebook" },
  { name: "TW", href: "#", label: "Twitter" },
  { name: "INS", href: "#", label: "Instagram" },
  { name: "PT", href: "#", label: "Pinterest" },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section className="first-screen relative w-full bg-white text-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 lg:py-16 h-[80vh] lg:h-[85vh] relative">
        {/* Redes sociais (esquerda) */}
        <div className="hidden lg:flex flex-col items-center gap-2 text-[12px] font-medium text-plum-dark/80 absolute left-0 top-1/2 -translate-y-1/2 z-30 tracking-widest">
          {SOCIAL_LINKS.map((social, idx) => (
            <div
              key={social.name}
              className="flex flex-col items-center gap-1">
              {idx !== 0 && (
                <span
                  className="h-4 w-px bg-sand/60"
                  aria-hidden
                />
              )}
              <a
                href={social.href}
                aria-label={social.label}
                className="hover:text-black transition-colors">
                {social.name}
              </a>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[52%_48%] gap-10 h-full relative">
          {/* Área da imagem */}
          <div className="relative rounded-2xl overflow-hidden shadow-sm bg-rose-soft/50">
            {SLIDES.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <div
                  key={slide.id}
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

          {/* Conteúdo */}
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

        {/* Navegação inferior direita */}
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

        {/* Navegação mobile */}
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
