"use client";

import { useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HorizontalScrollProps {
  /** Conteúdo a ser exibido com scroll horizontal */
  children: ReactNode;
  /** Quantidade de pixels para rolar ao clicar nas setas (padrão: 240) */
  scrollAmount?: number;
  /** Mostrar ou ocultar as setas de navegação (padrão: true) */
  showArrows?: boolean;
  /** Classes CSS personalizadas para o container de scroll */
  className?: string;
  /** Classes CSS personalizadas para os botões de seta */
  arrowClassName?: string;
}

/**
 * Componente de scroll horizontal com setas de navegação.
 *
 * Permite rolar conteúdo horizontalmente usando botões ou arrasto.
 * A barra de scroll fica oculta para um visual mais limpo.
 *
 * @example
 * <HorizontalScroll scrollAmount={300} className="gap-4">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </HorizontalScroll>
 */
export function HorizontalScroll({
  children,
  scrollAmount = 240,
  showArrows = true,
  className = "",
  arrowClassName = "",
}: HorizontalScrollProps) {
  // Referência para o container de scroll
  const scrollRef = useRef<HTMLDivElement>(null);

  /**
   * Rola o conteúdo para esquerda ou direita
   */
  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* Seta esquerda */}
      {showArrows && (
        <button
          onClick={() => scroll("left")}
          aria-label="Rolar para esquerda"
          className={`absolute left-0 top-0 h-full z-10 ${arrowClassName}`}>
          <ChevronLeft size={14} />
        </button>
      )}

      {/* Container com scroll horizontal (scrollbar oculta) */}
      <div
        ref={scrollRef}
        className={`overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${className}`}>
        {children}
      </div>

      {/* Seta direita */}
      {showArrows && (
        <button
          onClick={() => scroll("right")}
          aria-label="Rolar para direita"
          className={`absolute right-0 top-0 h-full z-10 ${arrowClassName}`}>
          <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}
