"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * Interface para definir a estrutura de cada categoria
 */
interface Category {
  id: string;
  name: string;
  href: string;
  image: string;
  colorClass: string;
}

/**
 * Dados das categorias exibidas no carrossel
 * @constant
 */
const CATEGORIES: Category[] = [
  {
    id: "acessorios",
    name: "Acessórios Belezuura",
    href: "/shop?category=acessorios",
    image: "/images/categories/acessorios.jpg",
    colorClass: "bg-[#9b59b6]",
  },
  {
    id: "cabelos",
    name: "Cabelos Belezuura",
    href: "/shop?category=cabelos",
    image: "/images/categories/cabelos.jpg",
    colorClass: "bg-[#8b4513]",
  },
  {
    id: "calcas",
    name: "Calças Belezuura",
    href: "/shop?category=calcas",
    image: "/images/categories/camisas.jpg",
    colorClass: "bg-[#34495e]",
  },
  {
    id: "camisas",
    name: "Camisas Belezuura",
    href: "/shop?category=camisas",
    image: "/images/categories/camisas.jpg",
    colorClass: "bg-[#e67e22]",
  },
  {
    id: "conjuntos",
    name: "Conjuntos Belezuura",
    href: "/shop?category=conjuntos",
    image: "/images/categories/fitness.jpg",
    colorClass: "bg-[#16a085]",
  },
  {
    id: "fitness",
    name: "Fitness Belezuura",
    href: "/shop?category=fitness",
    image: "/images/categories/fitness.jpg",
    colorClass: "bg-[#1abc9c]",
  },
  {
    id: "jaquetas",
    name: "Jaquetas Belezuura",
    href: "/shop?category=jaquetas",
    image: "/images/categories/camisas.jpg",
    colorClass: "bg-[#2c3e50]",
  },
  {
    id: "jeans",
    name: "Jeans Belezuura",
    href: "/shop?category=jeans",
    image: "/images/categories/fitness.jpg",
    colorClass: "bg-[#2980b9]",
  },
  {
    id: "lingerie",
    name: "Lingerie Belezuura",
    href: "/shop?category=lingerie",
    image: "/images/categories/praia.jpg",
    colorClass: "bg-[#e056fd]",
  },
  {
    id: "maquiagem",
    name: "Maquiagem Belezuura",
    href: "/shop?category=maquiagem",
    image: "/images/categories/maquiagem.jpg",
    colorClass: "bg-[#ff6b9d]",
  },
  {
    id: "pele",
    name: "Pele Belezuura",
    href: "/shop?category=pele",
    image: "/images/categories/skincare.jpg",
    colorClass: "bg-[#6a8e58]",
  },
  {
    id: "praia",
    name: "Praia Belezuura",
    href: "/shop?category=praia",
    image: "/images/categories/praia.jpg",
    colorClass: "bg-[#5dade2]",
  },
  {
    id: "shorts-saias",
    name: "Shorts/Saias Belezuura",
    href: "/shop?category=shorts-saias",
    image: "/images/categories/praia.jpg",
    colorClass: "bg-[#f1c40f]",
  },
  {
    id: "vestidos",
    name: "Vestidos Belezuura",
    href: "/shop?category=vestidos",
    image: "/images/categories/maquiagem.jpg",
    colorClass: "bg-[#e74c3c]",
  },
];

/**
 * Componente CategoriesCarousel - Mobile First
 *
 * Carrossel infinito de categorias otimizado para mobile com:
 * - Scroll infinito suave
 * - Drag/touch nativo
 * - Auto-scroll progressivo
 * - Indicadores visuais
 * - Performance otimizada
 *
 * @returns {JSX.Element} Carrossel de categorias
 */
export default function CategoriesCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Estados simplificados - Mobile First
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [activeIndicator, setActiveIndicator] = useState(0);

  // Refs otimizados
  const dragStartPos = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const velocity = useRef(0);
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);
  const animationFrame = useRef<number | null>(null);

  // Constantes - Mobile First (tamanhos menores)
  const ITEM_WIDTH_MOBILE = 95; // Mobile: 95px
  const ITEM_WIDTH_TABLET = 110; // Tablet: 110px
  const ITEM_WIDTH_DESKTOP = 140; // Desktop: 140px
  const GAP = 16; // Gap mobile: 16px
  const CLONE_COUNT = 3;
  const AUTO_SCROLL_SPEED = 0.3; // Mais lento para mobile
  const FRICTION = 0.94;
  const MIN_VELOCITY = 0.05;

  /**
   * Obtém o tamanho do item baseado no viewport
   */
  const getItemWidth = useCallback(() => {
    if (typeof window === "undefined") return ITEM_WIDTH_MOBILE;
    const width = window.innerWidth;
    if (width >= 1024) return ITEM_WIDTH_DESKTOP;
    if (width >= 768) return ITEM_WIDTH_TABLET;
    return ITEM_WIDTH_MOBILE;
  }, []);

  /**
   * Cria array infinito de categorias
   */
  const infiniteCategories = [
    ...Array(CLONE_COUNT).fill(CATEGORIES).flat(),
    ...CATEGORIES,
    ...Array(CLONE_COUNT).fill(CATEGORIES).flat(),
  ];

  /**
   * Inicializa posição do carrossel
   */
  useEffect(() => {
    const initPosition = () => {
      if (!trackRef.current) return;

      const itemWidth = getItemWidth() + GAP;
      const startPosition = itemWidth * CATEGORIES.length * CLONE_COUNT;

      setCurrentPosition(startPosition);
      trackRef.current.style.transform = `translateX(-${startPosition}px)`;
    };

    initPosition();

    // Reinicializa ao redimensionar
    const handleResize = () => initPosition();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [getItemWidth]);

  /**
   * Verifica e corrige loop infinito
   */
  const checkInfiniteLoop = useCallback(
    (position: number) => {
      if (!trackRef.current) return position;

      const itemWidth = getItemWidth() + GAP;
      const singleSetWidth = itemWidth * CATEGORIES.length;
      const threshold = singleSetWidth * (CLONE_COUNT - 0.5);
      const maxThreshold =
        singleSetWidth * (CLONE_COUNT + CATEGORIES.length + 0.5);

      let newPos = position;

      if (position <= threshold) {
        newPos = position + singleSetWidth;
        trackRef.current.style.transition = "none";
        trackRef.current.style.transform = `translateX(-${newPos}px)`;
        void trackRef.current.offsetHeight; // Force reflow
        trackRef.current.style.transition = "";
      } else if (position >= maxThreshold) {
        newPos = position - singleSetWidth;
        trackRef.current.style.transition = "none";
        trackRef.current.style.transform = `translateX(-${newPos}px)`;
        void trackRef.current.offsetHeight;
        trackRef.current.style.transition = "";
      }

      return newPos;
    },
    [getItemWidth]
  );

  /**
   * Atualiza indicadores
   */
  const updateIndicators = useCallback(
    (position: number) => {
      const itemWidth = getItemWidth() + GAP;
      const singleSetWidth = itemWidth * CATEGORIES.length;
      const normalizedPosition = position % singleSetWidth;
      const progress = normalizedPosition / singleSetWidth;
      const currentDot = Math.floor(progress * 3) % 3;

      setActiveIndicator(currentDot);
    },
    [getItemWidth]
  );

  /**
   * Auto-scroll suave
   */
  const startAutoScroll = useCallback(() => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }

    autoScrollInterval.current = setInterval(() => {
      setCurrentPosition((prev) => {
        const newPos = prev + AUTO_SCROLL_SPEED;
        const adjustedPos = checkInfiniteLoop(newPos);
        updateIndicators(adjustedPos);
        return adjustedPos;
      });
    }, 16); // ~60fps
  }, [checkInfiniteLoop, updateIndicators]);

  /**
   * Para auto-scroll
   */
  const stopAutoScroll = useCallback(() => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
      autoScrollInterval.current = null;
    }
  }, []);

  /**
   * Gerencia auto-scroll
   */
  useEffect(() => {
    if (!isDragging) {
      startAutoScroll();
    }
    return () => stopAutoScroll();
  }, [isDragging, startAutoScroll, stopAutoScroll]);

  /**
   * Inicia drag/touch
   */
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    stopAutoScroll();

    setStartX(clientX);
    dragStartPos.current = currentPosition;
    lastX.current = clientX;
    lastTime.current = Date.now();
    velocity.current = 0;

    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
  };

  /**
   * Durante drag/touch
   */
  const handleMove = (clientX: number) => {
    if (!isDragging) return;

    const now = Date.now();
    const timeDelta = now - lastTime.current;

    if (timeDelta > 0) {
      velocity.current = (clientX - lastX.current) / timeDelta;
    }

    const walk = startX - clientX;
    const newPosition = dragStartPos.current + walk;

    setCurrentPosition(newPosition);
    updateIndicators(newPosition);

    lastX.current = clientX;
    lastTime.current = now;
  };

  /**
   * Finaliza drag/touch
   */
  const handleEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);

    // Aplica inércia se houver velocidade
    if (Math.abs(velocity.current) > MIN_VELOCITY) {
      applyMomentum();
    } else {
      const adjustedPos = checkInfiniteLoop(currentPosition);
      setCurrentPosition(adjustedPos);
      startAutoScroll();
    }
  };

  /**
   * Aplica efeito de inércia
   */
  const applyMomentum = () => {
    let currentVelocity = velocity.current;

    const animate = () => {
      currentVelocity *= FRICTION;

      if (Math.abs(currentVelocity) > MIN_VELOCITY) {
        setCurrentPosition((prev) => {
          const newPos = prev - currentVelocity * 16;
          updateIndicators(newPos);
          return newPos;
        });

        animationFrame.current = requestAnimationFrame(animate);
      } else {
        const adjustedPos = checkInfiniteLoop(currentPosition);
        setCurrentPosition(adjustedPos);
        startAutoScroll();
      }
    };

    animate();
  };

  /**
   * Atualiza transform
   */
  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${currentPosition}px)`;
    }
  }, [currentPosition]);

  return (
    <section className="relative w-full py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Gradiente decorativo - Mobile First */}
      <div className="absolute inset-0 bg-linear-to-b from-gold-warm/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header - Mobile First */}
        {/* <header className="text-center mb-6 sm:mb-8 md:mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#48384c] mb-2 sm:mb-3">
            Suas Categorias Favoritas
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#48384c]/60 max-w-xl mx-auto px-4">
            De alfaiataria a beleza, tudo em um só lugar
          </p>
        </header> */}

        {/* Carrossel Header com Indicadores - Mobile First */}
        <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
          <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-semibold text-plum-dark">
            Categorias
          </h3>

          {/* Indicadores - Apenas mobile */}
          <div className="flex gap-1.5 sm:gap-2 md:hidden">
            {[0, 1, 2].map((index) => (
              <span
                key={index}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${index === activeIndicator
                  ? "bg-gold-warm scale-125"
                  : "bg-gray-300"
                  }`}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        {/* Container do Carrossel - Mobile First */}
        <div
          ref={containerRef}
          className={`overflow-hidden py-3 sm:py-4 touch-pan-y ${isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
          onMouseDown={(e) => handleStart(e.clientX)}
          onMouseMove={(e) => isDragging && handleMove(e.clientX)}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={(e) => handleStart(e.touches[0].clientX)}
          onTouchMove={(e) => {
            if (isDragging) {
              e.preventDefault();
              handleMove(e.touches[0].clientX);
            }
          }}
          onTouchEnd={handleEnd}>
          {/* Track de Categorias - Mobile First */}
          <div
            ref={trackRef}
            className={`flex gap-4 sm:gap-5 md:gap-6 ${isDragging ? "" : "transition-transform duration-300 ease-out"
              }`}
            style={{ willChange: "transform" }}>
            {infiniteCategories.map((category, index) => (
              <Link
                key={`${category.id}-${index}`}
                href={category.href}
                className="flex flex-col items-center gap-2 sm:gap-2.5 md:gap-3 shrink-0 w-23.75 sm:w-27.5 md:w-35 group transition-transform duration-300 active:scale-95 md:hover:-translate-y-2"
                draggable={false}
                onClick={(e) => {
                  if (isDragging) e.preventDefault();
                }}>
                {/* Ícone Circular - Mobile First */}
                <div
                  className={`relative w-23.75 h-23.75 sm:w-27.5 sm:h-27.5 md:w-35 md:h-35 rounded-full overflow-hidden shadow-sm border border-white/50 transition-all duration-300 group-active:shadow md:group-hover:shadow-lg md:group-hover:-translate-y-1 ${category.colorClass}`}>
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-active:scale-105 md:group-hover:scale-110"
                    draggable={false}
                    sizes="(max-width: 640px) 95px, (max-width: 768px) 110px, 140px"
                    loading="lazy"
                    quality={85}
                  />
                </div>

                {/* Nome da Categoria - Mobile First */}
                <span className="text-xs sm:text-sm md:text-base font-medium text-plum-dark text-center leading-tight transition-colors duration-300 group-active:text-gold-warm md:group-hover:text-gold-warm max-w-full px-1">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
