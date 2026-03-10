/**
 * Barra principal do Header
 *
 * Contém logo, busca (desktop), navegação (desktop) e ícones de ação
 */

"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Menu, User } from "lucide-react";
import { SearchInput } from "@/components/ui/SearchInput";
import { NAV_LINKS } from "@/components/constants/navigation";
import { useNavigation } from "@/components/hooks/useNavigation";

// ─────────────────────────────────────────────────────────────
// Interfaces
// ─────────────────────────────────────────────────────────────

interface MainBarProps {
  /** Query atual de busca */
  searchQuery: string;
  /** Callback ao mudar a query */
  onSearchChange: (value: string) => void;
  /** Callback ao submeter a busca */
  onSearchSubmit: () => void;
  /** Callback ao abrir o menu mobile */
  onMenuOpen: () => void;
  /** Se a busca mobile está expandida */
  searchOpen: boolean;
  /** Callback ao toggle da busca mobile */
  onSearchToggle: () => void;
}

// ─────────────────────────────────────────────────────────────
// Componente
// ─────────────────────────────────────────────────────────────

/**
 * Barra principal do header com logo, busca, navegação e ícones
 */
export function MainBar({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onMenuOpen,
  searchOpen,
  onSearchToggle,
}: MainBarProps) {
  const { isNavActive } = useNavigation();

  return (
    <div
      className="bg-white"
      style={{ borderBottom: "1px solid rgba(211,171,145,0.25)" }}>
      <div className="container mx-auto px-3 sm:px-5 lg:px-8">
        <div className="flex items-stretch h-14 lg:h-16 gap-2 sm:gap-3 lg:gap-4">
          {/* ────────────────────────────────────────────────────── */}
          {/* Hambúrguer — Mobile only */}
          {/* ────────────────────────────────────────────────────── */}
          <button
            onClick={onMenuOpen}
            aria-label="Abrir menu"
            aria-expanded={false}
            className="md:hidden self-center flex items-center justify-center w-10 h-10 -ml-1
                       text-plum-dark/70 hover:text-plum-dark transition-colors">
            <Menu size={21} />
          </button>

          {/* ────────────────────────────────────────────────────── */}
          {/* Logo */}
          {/* ────────────────────────────────────────────────────── */}
          <Link
            href="/"
            className="shrink-0 self-center"
            aria-label="Página inicial Belezuura">
            <Image
              src="/logo/logo-belezuura-sem-fundo.jpg"
              alt="Belezuura"
              width={120}
              height={44}
              priority
              className="h-8 sm:h-9 lg:h-10 w-auto object-contain"
            />
          </Link>

          {/* ────────────────────────────────────────────────────── */}
          {/* Centro: Busca + Nav Links (Desktop) */}
          {/* ────────────────────────────────────────────────────── */}
          <div className="hidden md:flex flex-1 items-stretch min-w-0">
            {/* Input de busca - Desktop */}
            <div className="self-center w-full max-w-60 lg:max-w-85 mr-2 lg:mr-4 shrink-0">
              <SearchInput
                value={searchQuery}
                onChange={onSearchChange}
                onSubmit={onSearchSubmit}
                size="sm"
              />
            </div>

            {/* Links de navegação - Desktop Grande (lg+) */}
            <nav
              aria-label="Navegação principal"
              className="hidden lg:flex items-stretch">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  aria-current={isNavActive(href) ? "page" : undefined}
                  className={`self-stretch flex items-center px-3.5 xl:px-4
                              text-[13px] font-medium tracking-wide whitespace-nowrap
                              transition-colors border-b-2
                              ${
                                isNavActive(href)
                                  ? "border-plum-dark text-plum-dark"
                                  : "border-transparent text-plum-dark/60 hover:text-plum-dark hover:border-sand/70"
                              }`}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ────────────────────────────────────────────────────── */}
          {/* Ícones de Ação (Direita) */}
          {/* ────────────────────────────────────────────────────── */}
          <div className="flex items-center gap-0.5 lg:gap-1 ml-auto md:ml-0 shrink-0">
            {/* Busca — Mobile only */}
            <button
              onClick={onSearchToggle}
              aria-label="Abrir busca"
              className="md:hidden flex items-center justify-center w-10 h-10
                         text-plum-dark/70 hover:text-plum-dark transition-colors">
              <Search size={19} />
            </button>

            {/* Minha Conta — Desktop only */}
            <Link
              href="/conta"
              aria-label="Minha conta"
              className="hidden md:flex items-center gap-1.5 text-plum-dark/65 hover:text-plum-dark
                         transition-colors group px-2.5 h-full">
              <User
                size={18}
                className="shrink-0"
              />
              <span className="hidden xl:flex flex-col leading-tight">
                <span className="text-[10px] text-plum-dark/40 group-hover:text-plum-dark/60 transition-colors">
                  Olá! Entrar na
                </span>
                <span className="text-xs font-semibold tracking-wide">
                  Minha Conta
                </span>
              </span>
            </Link>

            {/* Sacola de Compras */}
            <Link
              href="/carrinho"
              aria-label="Sacola de compras"
              className="flex items-center gap-1.5 text-plum-dark/65 hover:text-plum-dark
                         transition-colors group px-2 md:px-2.5 h-full">
              <ShoppingBag
                size={19}
                className="shrink-0"
              />
              <span className="hidden xl:flex flex-col leading-tight">
                <span className="text-[10px] text-plum-dark/40 group-hover:text-plum-dark/60 transition-colors">
                  Sua
                </span>
                <span className="text-xs font-semibold tracking-wide">
                  Sacola
                </span>
              </span>
            </Link>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────── */}
        {/* Busca Expandida — Mobile */}
        {/* ────────────────────────────────────────────────────── */}
        {searchOpen && (
          <div className="md:hidden pb-3">
            <SearchInput
              value={searchQuery}
              onChange={onSearchChange}
              onSubmit={onSearchSubmit}
              placeholder="O que você procura hoje?"
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  );
}
