"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Slide {
  id: number;
  tag: string;
  category: string;
  title: string;
  description?: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  textPosition: "left" | "center" | "right";
}

const SLIDES: Slide[] = [
  {
    id: 1,
    tag: "ACCESSORIES",
    category: "NEW ACCESSORIES",
    title: "Fashion For This Summer",
    buttonText: "Shop Now",
    buttonLink: "/shop",
    image: "/images/hero/slide-1.svg",
    textPosition: "left",
  },
  {
    id: 2,
    tag: "SWETERS",
    category: "MEN COLLECTION",
    title: "New Autumn Arrivals 2024",
    buttonText: "Shop Now",
    buttonLink: "/shop",
    image: "/images/hero/slide-2.svg",
    textPosition: "center",
  },
  {
    id: 3,
    tag: "DRESSES",
    category: "WOMEN COLLECTION",
    title: "Trendy Look For Every Day",
    buttonText: "Shop Now",
    buttonLink: "/shop",
    image: "/images/hero/slide-3.svg",
    textPosition: "right",
  },
  {
    id: 4,
    tag: "SEASON SALE",
    category: "",
    title: "Elegância que Transcende",
    description:
      "Descubra peças exclusivas de alfaiataria e cosméticos premium",
    buttonText: "Descobrir",
    buttonLink: "/shop",
    image: "/images/hero/slide-4.svg",
    textPosition: "center",
  },
];

const AUTOPLAY_INTERVAL = 5000;

const TEXT_POSITION_CLASSES = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right",
} as const;

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  const goToSlide = (index: number) => setCurrentSlide(index);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, AUTOPLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section
      className="relative w-full h-125 md:h-150 lg:h-175 overflow-hidden bg-rose-soft"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}>
      {/* Slides */}
      <div className="relative h-full">
        {SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}>
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  quality={90}
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/10 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative h-full container mx-auto px-4 md:px-8 flex flex-col justify-center">
                <div
                  className={`flex flex-col gap-3 md:gap-5 max-w-2xl ${
                    TEXT_POSITION_CLASSES[slide.textPosition]
                  }`}>
                  {/* Tag */}
                  {slide.tag && (
                    <span className="text-xs md:text-sm tracking-[0.2em] font-bold text-plum-dark bg-white/95 px-5 py-2 rounded-full backdrop-blur-sm uppercase w-fit">
                      {slide.tag}
                    </span>
                  )}

                  {/* Category */}
                  {slide.category && (
                    <p className="text-xs md:text-sm tracking-[0.25em] text-sage font-semibold uppercase">
                      {slide.category}
                    </p>
                  )}

                  {/* Title */}
                  <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-plum-dark leading-tight font-bold">
                    {slide.title}
                  </h2>

                  {/* Description */}
                  {slide.description && (
                    <p className="text-sm md:text-base lg:text-lg text-plum-dark/80 max-w-lg leading-relaxed">
                      {slide.description}
                    </p>
                  )}

                  {/* Button */}
                  <Link
                    href={slide.buttonLink}
                    className="inline-block px-10 py-3.5 md:px-12 md:py-4 bg-plum-dark text-white rounded-full uppercase text-xs md:text-sm tracking-[0.15em] font-semibold hover:bg-sage transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl w-fit mt-2">
                    {slide.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <NavButton
        onClick={prevSlide}
        direction="left"
      />
      <NavButton
        onClick={nextSlide}
        direction="right"
      />

      {/* Dots Navigation */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-2.5 md:gap-3">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "w-10 md:w-14 h-2.5 md:h-3 bg-plum-dark"
                : "w-2.5 md:w-3 h-2.5 md:h-3 bg-white/70 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Stats Counter */}
      <div className="absolute top-6 md:top-10 right-6 md:right-10 z-20 bg-white/95 backdrop-blur-sm rounded-xl p-5 md:p-7 shadow-xl">
        <div className="text-center">
          <div className="text-3xl md:text-5xl font-bold text-plum-dark tracking-tight">
            2587<span className="text-sage text-2xl md:text-3xl">+</span>
          </div>
          <div className="text-[10px] md:text-xs text-plum-dark/60 uppercase tracking-[0.15em] mt-1.5 font-semibold">
            Products for you
          </div>
        </div>
      </div>
    </section>
  );
}

// Componente auxiliar para botões de navegação
function NavButton({
  onClick,
  direction,
}: {
  onClick: () => void;
  direction: "left" | "right";
}) {
  const isLeft = direction === "left";

  return (
    <button
      onClick={onClick}
      className={`absolute ${
        isLeft ? "left-4 md:left-8" : "right-4 md:right-8"
      } top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110 shadow-xl`}
      aria-label={`${isLeft ? "Previous" : "Next"} slide`}>
      <svg
        className="w-5 h-5 md:w-6 md:h-6 text-plum-dark"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d={isLeft ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
        />
      </svg>
    </button>
  );
}
