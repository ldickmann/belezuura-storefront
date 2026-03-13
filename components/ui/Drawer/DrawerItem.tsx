/**
 * Item de lista do Drawer
 *
 * Componente reutilizável para links dentro do drawer mobile
 */

"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { type ReactNode } from "react";

// ─────────────────────────────────────────────────────────────
// Interfaces
// ─────────────────────────────────────────────────────────────

interface DrawerItemProps {
  /** URL de destino */
  href: string;
  /** Callback ao clicar (geralmente para fechar o drawer) */
  onClose: () => void;
  /** Se o link está ativo (página atual) */
  isActive?: boolean;
  /** Classe de fundo quando ativo */
  activeBg?: string;
  /** Cor do chevron quando ativo */
  chevronActive?: string;
  /** Altura do item */
  height?: string;
  /** Conteúdo do item */
  children: ReactNode;
}

// ─────────────────────────────────────────────────────────────
// Componente
// ─────────────────────────────────────────────────────────────

/**
 * Link estilizado para uso dentro do Drawer
 */
export function DrawerItem({
  href,
  onClose,
  isActive = false,
  activeBg = "bg-plum-dark/[0.04]",
  chevronActive = "text-plum-dark/50",
  height = "h-14",
  children,
}: DrawerItemProps) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClose}
        aria-current={isActive ? "page" : undefined}
        className={`flex items-center justify-between px-5 ${height}
                    transition-colors duration-150 group
                    ${isActive ? activeBg : "hover:bg-sand/20"}`}>
        {/* Conteúdo customizável */}
        {children}

        {/* Chevron indicador */}
        <ChevronRight
          size={15}
          className={`shrink-0 transition-transform duration-150 group-hover:translate-x-0.5
                      ${isActive ? chevronActive : "text-plum-dark/20"}`}
        />
      </Link>
    </li>
  );
}
