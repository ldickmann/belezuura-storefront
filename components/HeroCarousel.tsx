/**
 * HeroCarousel.tsx
 *
 * Hero minimalista com foco em UI/UX:
 * - Imagem full-bleed como plano de fundo
 * - Conteúdo centralizado com hierarquia clara
 * - CTAs em formato de botão (sem campo de busca)
 * - Navegação apenas por setas
 * - Autoplay ativo com pausa durante interação do usuário
 *
 * Correções aplicadas:
 * - Autoplay respeita prefers-reduced-motion (sem exibir texto)
 * - Classes alinhadas ao padrão do Tailwind v4
 * - Remoção de campos não usados nos dados
 */

"use client";

import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import Image from "next/image";
import Link from "next/link";
import {
  SiFacebook,
  SiInstagram,
  SiPinterest,
  SiTiktok,
  SiX,
} from "react-icons/si";

/* ---------------------------------------------------------- */
/* Types */
/* ---------------------------------------------------------- */

interface Slide {
  id: number;
  kicker: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  image: string;
  imageAlt: string;
  imagePositionClassName: string;
}

interface SocialLink {
  id: string;
  href: string;
  label: string;
  Icon: IconType;
}

/* ---------------------------------------------------------- */
/* Data */
/* ---------------------------------------------------------- */

const SLIDES: Slide[] = [
  {
    id: 1,
    kicker: "Coleção Fitness",
    title: "Conforto, movimento\ne presença.",
    description:
      "Peças com tecnologia têxtil e caimento premium para elevar sua rotina dentro e fora do treino.",
    primaryHref: "/search?q=fitness",
    primaryLabel: "Ver coleção fitness",
    secondaryHref: "/loja",
    secondaryLabel: "Ver catálogo completo",
    image: "/images/hero/hero-img-01.jpg",
    imageAlt: "Coleção fitness Belezuura",
    imagePositionClassName: "object-center",
  },
  {
    id: 2,
    kicker: "Linha Cabelos",
    title: "Ritual de cuidado\ncom acabamento de luxo.",
    description:
      "Curadoria para brilho, nutrição e definição, com fórmulas selecionadas para uso diário.",
    primaryHref: "/search?q=cabelos",
    primaryLabel: "Explorar cabelos",
    secondaryHref: "/loja",
    secondaryLabel: "Ver catálogo completo",
    image: "/images/hero/hero-img-02.jpg",
    imageAlt: "Linha de cosméticos para cabelos Belezuura",
    imagePositionClassName: "object-center",
  },
  {
    id: 3,
    kicker: "Maquiagem",
    title: "Beleza autoral,\nresultado sofisticado.",
    description:
      "Produtos para realçar sua identidade com textura, fixação e acabamento impecável.",
    primaryHref: "/search?q=maquiagem",
    primaryLabel: "Conhecer maquiagem",
    secondaryHref: "/loja",
    secondaryLabel: "Ver catálogo completo",
    image: "/images/hero/hero-img-03.jpg",
    imageAlt: "Coleção de maquiagem Belezuura",
    imagePositionClassName: "object-center",
  },
];

const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "instagram",
    href: "https://www.instagram.com/belezuurastore/",
    label: "Instagram",
    Icon: SiInstagram,
  },
  {
    id: "facebook",
    href: "https://www.facebook.com/belezuura",
    label: "Facebook",
    Icon: SiFacebook,
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
  {
    id: "x",
    href: "https://x.com/belezuura",
    label: "X",
    Icon: SiX,
  },
];

/* ---------------------------------------------------------- */
/* Helpers */
/* ---------------------------------------------------------- */

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function getInitialReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  if (typeof window.matchMedia !== "function") return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/* ---------------------------------------------------------- */
/* Component */
/* ---------------------------------------------------------- */

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(getInitialReducedMotion);
  const sectionRef = useRef<HTMLElement>(null);

  const activeSlide = SLIDES[currentSlide];

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function"
    ) {
      return;
    }

    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const handleChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (isPaused || reducedMotion) return;

    const timerId = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6500);

    return () => window.clearInterval(timerId);
  }, [isPaused, reducedMotion]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Destaques da Belezuura"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        const nextFocused = event.relatedTarget as Node | null;
        if (!nextFocused || !sectionRef.current?.contains(nextFocused)) {
          setIsPaused(false);
        }
      }}
      className="relative isolate overflow-hidden border-b border-plum-dark/10">
      <div className="absolute inset-0 -z-20">
        {SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;

          return (
            <div
              key={slide.id}
              aria-hidden={!isActive}
              className={[
                "absolute inset-0 transition-opacity duration-700 ease-out",
                isActive ? "opacity-100" : "pointer-events-none opacity-0",
              ].join(" ")}>
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                priority={index === 0}
                sizes="100vw"
                className={["object-cover", slide.imagePositionClassName].join(
                  " ",
                )}
              />
            </div>
          );
        })}
      </div>

      <div className="absolute inset-0 -z-10 bg-linear-to-b from-plum-dark/80 via-plum-dark/65 to-plum-dark/75" />

      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, rgba(255,255,255,0.18) 0 1px, transparent 1px 46px)",
        }}
        aria-hidden
      />

      <div className="mx-auto flex min-h-[72vh] w-full max-w-7xl flex-col px-4 pb-10 pt-12 sm:min-h-[78vh] sm:px-6 sm:pb-12 sm:pt-14 lg:min-h-[84vh] lg:px-10 lg:pb-14 lg:pt-16">
        <div className="flex items-center justify-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/70 sm:text-[11px]">
            {activeSlide.kicker}
          </p>
        </div>

        <div className="mx-auto my-auto flex w-full max-w-3xl flex-col items-center text-center">
          <h1
            className="font-serif text-[clamp(2.1rem,7vw,5.2rem)] leading-[0.95] tracking-tight text-white"
            style={{ whiteSpace: "pre-line" }}>
            {activeSlide.title}
          </h1>

          <p className="mt-5 max-w-[60ch] text-sm leading-7 text-white/80 sm:mt-6 sm:text-base">
            {activeSlide.description}
          </p>

          <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <Link
              href={activeSlide.primaryHref}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-gold-warm px-6 text-sm font-semibold text-plum-dark transition-colors hover:bg-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-warm/60">
              {activeSlide.primaryLabel}
            </Link>

            <Link
              href={activeSlide.secondaryHref}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 text-sm font-medium text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">
              {activeSlide.secondaryLabel}
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:mt-10 sm:flex-row">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Slide anterior"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white/85 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">
              <span aria-hidden>←</span>
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Próximo slide"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white/85 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">
              <span aria-hidden>→</span>
            </button>
          </div>

          <nav
            aria-label="Redes sociais"
            className="flex items-center gap-1">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/55 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">
                <social.Icon
                  className="h-4 w-4"
                  aria-hidden
                />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
