/**
 * Seletor de ordenação da página de busca.
 * Client Component — atualiza o searchParam ?sort= via URL.
 */
"use client";

import { useRouter, useSearchParams } from "next/navigation";

const SORT_OPTIONS = [
  { value: "relevance", label: "Mais relevantes" },
  { value: "price_asc", label: "Menor preço" },
  { value: "price_desc", label: "Maior preço" },
  { value: "name_asc", label: "A → Z" },
] as const;

interface SortSelectProps {
  currentSort: string;
  /** Rota base para montar a URL de ordenação. Padrão: "/search" */
  basePath?: string;
}

export function SortSelect({
  currentSort,
  basePath = "/search",
}: SortSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    router.push(`${basePath}?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="sort-select"
        className="text-[13px] text-plum-dark/50 whitespace-nowrap shrink-0">
        Ordenar por
      </label>
      <div className="relative">
        <select
          id="sort-select"
          value={currentSort}
          onChange={handleChange}
          aria-label="Ordenar resultados"
          className="h-9 pl-3.5 pr-9 rounded-xl border border-sand/40 bg-white
                     text-plum-dark text-[13px] font-medium appearance-none cursor-pointer
                     hover:border-plum-dark/30 focus:outline-none focus:border-plum-dark/50
                     transition-colors">
          {SORT_OPTIONS.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-plum-dark/40"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true">
          <path
            d="M2 4l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
