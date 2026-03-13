/**
 * Componente de busca reutilizável
 *
 * Utilizado no header (desktop e mobile) e pode ser usado
 * em qualquer página que precise de busca
 */

"use client";

import { Search } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Interfaces
// ─────────────────────────────────────────────────────────────

export interface SearchInputProps {
  /** Valor atual da busca */
  value: string;
  /** Callback quando o valor muda */
  onChange: (value: string) => void;
  /** Callback quando o formulário é submetido */
  onSubmit: () => void;
  /** Texto do placeholder */
  placeholder?: string;
  /** Tamanho: "sm" para header compacto, "md" para expansão mobile */
  size?: "sm" | "md";
  /** Se deve focar automaticamente ao renderizar */
  autoFocus?: boolean;
  /** Classes CSS adicionais */
  className?: string;
}

// ─────────────────────────────────────────────────────────────
// Componente
// ─────────────────────────────────────────────────────────────

/**
 * Input de busca com ícone e submit
 * @example
 * ```tsx
 * <SearchInput
 *   value={query}
 *   onChange={setQuery}
 *   onSubmit={() => router.push(`/search?q=${query}`)}
 *   size="sm"
 * />
 * ```
 */
export function SearchInput({
  value,
  onChange,
  onSubmit,
  placeholder = "O que você procura?",
  size = "md",
  autoFocus = false,
  className = "",
}: SearchInputProps) {
  const isSmall = size === "sm";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={`flex items-center border border-sand/35 rounded-full overflow-hidden
                  bg-rose-soft/15 focus-within:border-plum-dark/35 transition-colors ${className}`}>
      {/* Input de texto */}
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={`flex-1 min-w-0 bg-transparent text-plum-dark
                    placeholder:text-plum-dark/35 focus:outline-none
                    ${isSmall ? "px-3.5 py-2 text-[13px]" : "px-4 py-2.5 text-sm"}`}
      />

      {/* Botão de submit */}
      <button
        type="submit"
        aria-label="Buscar"
        className={`shrink-0 text-plum-dark/45 hover:text-plum-dark transition-colors
                    ${isSmall ? "px-3 py-2" : "px-3 py-2.5"}`}>
        <Search size={isSmall ? 14 : 15} />
      </button>
    </form>
  );
}
