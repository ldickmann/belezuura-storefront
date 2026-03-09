/**
 * Barra de categorias com scroll horizontal
 *
 * Exibe todas as categorias de produtos com navegação por arrows
 */

"use client";

import Link from "next/link";
import { HorizontalScroll } from "@/components/ui/HorizontalScroll";
import { CATEGORIES } from "@/components/constants/navigation";
import { useNavigation } from "@/components/hooks/useNavigation";

// ─────────────────────────────────────────────────────────────
// Componente
// ─────────────────────────────────────────────────────────────

/**
 * Barra horizontal de categorias abaixo do header principal
 */
export function CategoriesBar() {
  const { pathname } = useNavigation();

  return (
    <div
      className="bg-white"
      style={{
        borderTop: "1px solid rgba(211,171,145,0.30)",
        boxShadow:
          "inset 0 1px 0 rgba(211,171,145,0.45), 0 4px 14px -4px rgba(72,56,76,0.10)",
      }}>
      <div className="max-w-7xl mx-auto">
        <HorizontalScroll
          className="flex items-center px-2 sm:px-6"
          arrowClassName="hidden sm:flex px-1.5 items-center bg-gradient-to-r from-white via-white/80 to-transparent text-plum-dark/40 hover:text-plum-dark transition-colors">
          {CATEGORIES.map(({ label, href }) => {
            const isActive =
              pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`whitespace-nowrap shrink-0 px-3 sm:px-4 py-2.5 sm:py-3
                            text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold
                            transition-colors border-b-2
                            ${
                              isActive
                                ? "border-plum-dark text-plum-dark"
                                : "border-transparent text-plum-dark/55 hover:text-plum-dark hover:border-sand"
                            }`}>
                {label}
              </Link>
            );
          })}
        </HorizontalScroll>
      </div>
    </div>
  );
}
