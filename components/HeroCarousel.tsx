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
}

const SLIDES: Slide[] = [
  {
    id: 1,
    subtitle: "new collection",
    title: "Meet New Fashion Week",
    buttonText: "Shop Now",
    buttonLink: "/shop",
    image: "/images/hero/slide-1.svg",
  },
  {
    id: 2,
    subtitle: "new collection",
    title: "Meet New Fashion Week",
    buttonText: "Shop Now",
    buttonLink: "/shop",
    image: "/images/hero/slide-2.svg",
  },
  {
    id: 3,
    subtitle: "new collection",
    title: "Meet New Fashion Week",
    buttonText: "Shop Now",
    buttonLink: "/shop",
    image: "/images/hero/slide-3.svg",
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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  const goToSlide = (index: number) => setCurrentSlide(index);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlide]);

  return (
    <section className="first-screen relative w-full h-screen min-h-150 overflow-hidden bg-rose-soft">
      <div className="absolute inset-0 flex">
        {/* Left Side - Counter & Social Links */}
        <div className="first-screen__left hidden lg:flex flex-col justify-between py-8 px-6 z-20">
          {/* Slide Counter */}
          <div className="slider-count">
            <span className="text-2xl font-light text-plum-dark">
              <span className="font-medium">{currentSlide + 1}</span>/{SLIDES.length}
            </span>
          </div>

          {/* Social Links */}
          <ul className="side-socials flex flex-col gap-4">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  className="text-sm font-medium text-plum-dark hover:text-sage transition-colors duration-300 tracking-wider"
                  aria-label={social.label}>
                  {social.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Center - Main Slider */}
        <div className="first-screen__center flex-1 relative">
          <div className="main-slider h-full w-full relative">
            {/* Slides */}
            <div className="main-slider__list-wrap h-full">
              {SLIDES.map((slide, index) => {
                const isActive = index === currentSlide;

                return (
                  <div
                    key={slide.id}
                    className={`main-slider__item absolute inset-0 transition-opacity duration-1000 ${
                      isActive ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}>
                    <div className="main-slider__max h-full">
                      <div className="main-slider__row h-full flex items-center justify-center">
                        <div className="main-slider__cell relative w-full h-full">
                          {/* Content */}
                          <div className="main-slider__content absolute left-8 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 z-10 max-w-xl">
                            <span className="main-slider__subtitle category-subtitle block mb-4 text-sm md:text-base tracking-widest uppercase">
                              <b className="font-bold">new</b> collection
                            </span>
                            <h2 className="main-slider__title text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-plum-dark leading-tight mb-8">
                              Meet New <br />
                              Fashion Week
                            </h2>
                            <Link
                              href={slide.buttonLink}
                              className="button inline-block">
                              <span className="button__text inline-block px-8 md:px-10 py-3 md:py-4 bg-plum-dark text-white text-sm md:text-base tracking-wider uppercase font-medium hover:bg-sage transition-all duration-300">
                                {slide.buttonText}
                              </span>
                            </Link>
                          </div>

                          {/* Image */}
                          <div className="main-slider__image-wrap absolute inset-0">
                            <div
                              className="main-slider__image relative w-full h-full bg-cover bg-center bg-no-repeat"
                              style={{
                                backgroundImage: `url('${slide.image}')`,
                              }}>
                              {/* Fallback for Next.js Image optimization */}
                              <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                className="object-cover"
                                priority={index === 0}
                                quality={90}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Background Vector */}
            <div className="main-slider__bg-wrap absolute bottom-0 right-0 w-1/3 h-1/3 pointer-events-none opacity-30">
              <svg
                className="main-slider__bg w-full h-full"
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M200 0L400 200L200 400L0 200L200 0Z"
                  fill="currentColor"
                  className="text-plum-dark/10"
                />
              </svg>

              {/* Scroll Down Indicator */}
              <div className="scroll-down absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
                <span className="scroll-down__icon block w-6 h-10 border-2 border-plum-dark/30 rounded-full relative">
                  <span className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-2 bg-plum-dark/50 rounded-full animate-bounce"></span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Dots & Arrows */}
        <div className="first-screen__right hidden lg:flex flex-col justify-center items-center gap-8 py-8 px-6 z-20">
          {/* Dots Navigation */}
          <div className="slider-dots dots-1 flex flex-col gap-3">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-plum-dark scale-125"
                    : "bg-plum-dark/30 hover:bg-plum-dark/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrow Navigation */}
          <div className="slider-arrows arrows-1 flex flex-col gap-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 flex items-center justify-center border-2 border-plum-dark/30 hover:border-plum-dark hover:bg-plum-dark hover:text-white transition-all duration-300 group"
              aria-label="Previous slide">
              <span className="block w-4 h-4 border-l-2 border-t-2 border-current -rotate-45 -mr-1 group-hover:scale-110 transition-transform"></span>
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 flex items-center justify-center border-2 border-plum-dark/30 hover:border-plum-dark hover:bg-plum-dark hover:text-white transition-all duration-300 group"
              aria-label="Next slide">
              <span className="block w-4 h-4 border-r-2 border-b-2 border-current -rotate-45 -ml-1 group-hover:scale-110 transition-transform"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Controls */}
      <div className="lg:hidden absolute bottom-8 left-0 right-0 z-20 flex justify-center items-center gap-6 px-4">
        {/* Mobile Counter */}
        <div className="text-white text-sm font-light bg-plum-dark/70 backdrop-blur-sm px-4 py-2 rounded-full">
          <span className="font-medium">{currentSlide + 1}</span>/{SLIDES.length}
        </div>

        {/* Mobile Arrows */}
        <div className="flex gap-3">
          <button
            onClick={prevSlide}
            className="w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300"
            aria-label="Previous slide">
            <span className="block w-3 h-3 border-l-2 border-t-2 border-plum-dark -rotate-45 -mr-0.5"></span>
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300"
            aria-label="Next slide">
            <span className="block w-3 h-3 border-r-2 border-b-2 border-plum-dark -rotate-45 -ml-0.5"></span>
          </button>
        </div>

        {/* Mobile Dots */}
        <div className="flex gap-2">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-6"
                  : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
