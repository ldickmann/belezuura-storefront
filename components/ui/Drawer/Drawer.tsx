/**
 * Componente genérico de Drawer (menu lateral)
 *
 * Implementa overlay, animações, body scroll lock e tecla Escape
 * Reutilizável para qualquer tipo de menu lateral
 */

"use client";

import { type ReactNode } from "react";
import { useLockBodyScroll } from "@/components/hooks/useLockBodyScroll";
import { useEscapeKey } from "@/components/hooks/useEscapeKey";

// ─────────────────────────────────────────────────────────────
// Interfaces
// ─────────────────────────────────────────────────────────────

interface DrawerProps {
  /** Se o drawer está aberto */
  isOpen: boolean;
  /** Callback ao fechar */
  onClose: () => void;
  /** Conteúdo do drawer */
  children: ReactNode;
  /** Lado de onde o drawer aparece */
  side?: "left" | "right";
  /** Largura customizada */
  width?: string;
  /** Classes CSS adicionais */
  className?: string;
}

// ─────────────────────────────────────────────────────────────
// Componente
// ─────────────────────────────────────────────────────────────

/**
 * Drawer genérico com overlay e animações
 *
 * @example
 * ```tsx
 * <Drawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} side="left">
 *   <DrawerContent />
 * </Drawer>
 * ```
 */
export function Drawer({
  isOpen,
  onClose,
  children,
  side = "left",
  width = "w-[300px] sm:w-[340px]",
  className = "",
}: DrawerProps) {
  // Bloqueia scroll do body quando aberto
  useLockBodyScroll(isOpen);

  // Fecha com tecla Escape
  useEscapeKey(onClose, isOpen);

  // Classes CSS dinâmicas baseadas no lado
  const translateFrom =
    side === "left" ? "-translate-x-full" : "translate-x-full";
  const positionClass = side === "left" ? "left-0" : "right-0";

  return (
    <>
      {/* ─────────────────────────────────────────────────── */}
      {/* Overlay (fundo escuro com blur) */}
      {/* ─────────────────────────────────────────────────── */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] 
                    transition-opacity duration-300
                    ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* ─────────────────────────────────────────────────── */}
      {/* Drawer Panel */}
      {/* ─────────────────────────────────────────────────── */}
      <div
        role="dialog"
        aria-modal="true"
        className={`fixed top-0 ${positionClass} h-full z-50 bg-white ${width}
                    shadow-[4px_0_40px_-8px_rgba(0,0,0,0.18)]
                    transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
                    ${isOpen ? "translate-x-0" : translateFrom}
                    ${className}`}>
        {children}
      </div>
    </>
  );
}
