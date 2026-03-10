/**
 * Seção do Drawer com título
 *
 * Agrupa items relacionados com um título descritivo
 */

"use client";

import { type ReactNode } from "react";

// ─────────────────────────────────────────────────────────────
// Interfaces
// ─────────────────────────────────────────────────────────────

interface DrawerSectionProps {
  /** Título da seção */
  title: string;
  /** Classes CSS adicionais */
  className?: string;
  /** Lista de DrawerItems */
  children: ReactNode;
}

// ─────────────────────────────────────────────────────────────
// Componente
// ─────────────────────────────────────────────────────────────

/**
 * Container de seção do drawer com título e lista
 */
export function DrawerSection({
  title,
  className = "",
  children,
}: DrawerSectionProps) {
  return (
    <div className={className}>
      {/* Título da seção */}
      <p className="px-5 pb-2.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-plum-dark/35">
        {title}
      </p>

      {/* Lista de items */}
      <ul className="divide-y divide-sand/10">{children}</ul>
    </div>
  );
}
