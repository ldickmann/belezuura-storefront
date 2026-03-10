"use client";

import { useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HorizontalScrollProps {
  children: ReactNode;
  scrollAmount?: number;
  showArrows?: boolean;
  className?: string;
  arrowClassName?: string;
}

export function HorizontalScroll({
  children,
  scrollAmount = 240,
  showArrows = true,
  className = "",
  arrowClassName = "",
}: HorizontalScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {showArrows && (
        <button
          onClick={() => scroll("left")}
          aria-label="Rolar para esquerda"
          className={`absolute left-0 top-0 h-full z-10 ${arrowClassName}`}>
          <ChevronLeft size={14} />
        </button>
      )}

      <div
        ref={scrollRef}
        className={`overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${className}`}>
        {children}
      </div>

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
