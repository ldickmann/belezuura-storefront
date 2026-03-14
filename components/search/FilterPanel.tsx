/**
 * FilterPanel - O "carrinho de ferramentas" dos filtros
 *
 * ⚠️ IMPORTANTE: Este é um componente de APRESENTAÇÃO + LÓGICA
 * Os dados dos filtros (categorias, cores, tamanhos, preços) vêm como PROPS
 * vindos do servidor (que obtém do Wix Stores API)
 *
 * Este é um "Client Component" — significa que roda no navegador do usuário,
 * não no servidor. Usamos "use client" para isso.
 *
 * Responsabilidades:
 * 1. Receber dados dos filtros como props
 * 2. Gerenciar estado visual dos filtros
 * 3. Atualizar a URL quando o usuário muda um filtro
 */

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { X } from "lucide-react";

/**
 * ENTENDER ISTO:
 *
 * Quando o usuário marca "Acessórios" no checkbox, precisamos guardar isso.
 * Esta interface define COMO guardamos internamente:
 *
 * Exemplo:
 * {
 *   categories: ["acessorios", "camisas"],    // Categorias selecionadas
 *   priceMin: "50",                           // Preço mínimo
 *   priceMax: "610",                          // Preço máximo
 *   colors: ["vermelho", "azul"],             // Cores selecionadas
 *   sizes: ["m", "l"]                         // Tamanhos selecionados
 * }
 */
interface FilterState {
  categories: string[];
  priceMin: string;
  priceMax: string;
  colors: string[];
  sizes: string[];
}

/**
 * Dados que vêm do servidor (Wix API)
 */
interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterColor extends FilterOption {
  hex: string;
}

interface FilterPanelProps {
  /**
   * Lista de categorias que vem do Wix
   * Exemplo: [{ id: "acessorios", label: "Acessórios", count: 25 }, ...]
   */
  categories: FilterOption[];

  /**
   * Lista de cores que vem do Wix
   * Exemplo: [{ id: "vermelho", label: "Vermelho", hex: "#ef4444", count: 10 }, ...]
   */
  colors: FilterColor[];

  /**
   * Lista de tamanhos que vem do Wix
   * Exemplo: [{ id: "m", label: "M", count: 20 }, ...]
   */
  sizes: FilterOption[];

  /**
   * Faixa de preço mínima e máxima disponíveis no Wix
   */
  priceRange: {
    min: number;
    max: number;
  };

  /**
   * Valores iniciais dos filtros (do URL search params)
   */
  initialFilters?: Partial<FilterState>;

  /**
   * A rota base para redirecionar após atualizar os filtros.
   * Por exemplo: "/loja" ou "/search"
   */
  basePath?: string;
}

export function FilterPanel({
  categories,
  colors,
  sizes,
  priceRange,
  initialFilters = {},
  basePath = "/loja",
}: FilterPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  /**
   * ENTENDER ISTO:
   *
   * useState cria uma "caixa de memória" do React.
   * Toda vez que atualizamos filters, o componente redesenha.
   *
   * filters = o estado ATUAL
   * setFilters = a função para MUDAR o estado
   */
  const [filters, setFilters] = useState<FilterState>({
    categories: initialFilters.categories ?? [],
    priceMin: initialFilters.priceMin ?? priceRange.min.toString(),
    priceMax: initialFilters.priceMax ?? priceRange.max.toString(),
    colors: initialFilters.colors ?? [],
    sizes: initialFilters.sizes ?? [],
  });

  /**
   * ENTENDER ISTO:
   *
   * Esta função atualiza a URL com os filtros passados.
   * Ela é chamada DIRETAMENTE nos handlers (não via useEffect).
   *
   * Isso evita o infinite loop porque:
   * 1. Usuário clica checkbox
   * 2. Handler é chamado
   * 3. updateURLWithFilters() é chamada
   * 4. Router.push() muda a URL
   * 5. Componente recarrega com os novos searchParams
   * 6. Nenhum loop volta!
   *
   * Exemplo:
   * - Clica em "Acessórios"
   * - toggleCategory() é chamado
   * - setFilters() atualiza o estado
   * - updateURLWithFilters() navega para a nova URL
   * - /loja?categories=acessorios
   */
  function updateURLWithFilters(filtersToUse: FilterState) {
    const params = new URLSearchParams(searchParams.toString());

    // Atualiza cada parâmetro de filtro
    if (filtersToUse.categories.length > 0) {
      params.set("categories", filtersToUse.categories.join(","));
    } else {
      params.delete("categories");
    }

    if (filtersToUse.colors.length > 0) {
      params.set("colors", filtersToUse.colors.join(","));
    } else {
      params.delete("colors");
    }

    if (filtersToUse.sizes.length > 0) {
      params.set("sizes", filtersToUse.sizes.join(","));
    } else {
      params.delete("sizes");
    }

    // Preço sempre entra se tiver sido modificado
    params.set("priceMin", filtersToUse.priceMin);
    params.set("priceMax", filtersToUse.priceMax);

    // Redireciona para a nova URL
    const newUrl = `${basePath}?${params.toString()}`;
    router.push(newUrl);
  }

  /**
   * Quando o usuário marca/desmarca uma categoria:
   * 1. Se já está marcada → remove da lista
   * 2. Se não está → adiciona à lista
   * 3. IMEDIATAMENTE atualiza a URL
   */
  function toggleCategory(categoryId: string) {
    const updated = { ...filters };
    if (updated.categories.includes(categoryId)) {
      updated.categories = updated.categories.filter((c) => c !== categoryId);
    } else {
      updated.categories = [...updated.categories, categoryId];
    }
    setFilters(updated);
    updateURLWithFilters(updated);
  }

  /**
   * Quando o usuário marca/desmarca uma cor:
   * Mesma lógica que toggleCategory
   */
  function toggleColor(colorId: string) {
    const updated = { ...filters };
    if (updated.colors.includes(colorId)) {
      updated.colors = updated.colors.filter((c) => c !== colorId);
    } else {
      updated.colors = [...updated.colors, colorId];
    }
    setFilters(updated);
    updateURLWithFilters(updated);
  }

  /**
   * Quando o usuário marca/desmarca um tamanho:
   * Mesma lógica que toggleCategory
   */
  function toggleSize(sizeId: string) {
    const updated = { ...filters };
    if (updated.sizes.includes(sizeId)) {
      updated.sizes = updated.sizes.filter((s) => s !== sizeId);
    } else {
      updated.sizes = [...updated.sizes, sizeId];
    }
    setFilters(updated);
    updateURLWithFilters(updated);
  }

  /**
   * Quando o usuário muda o slider ou inputs de preço:
   * Atualiza o estado E a URL
   */
  function handlePriceChange(min: string, max: string) {
    const updated: FilterState = {
      categories: filters.categories,
      priceMin: min,
      priceMax: max,
      colors: filters.colors,
      sizes: filters.sizes,
    };
    setFilters(updated);
    updateURLWithFilters(updated);
  }

  /**
   * Limpar TODOS os filtros
   */
  function clearAllFilters() {
    const updated: FilterState = {
      categories: [],
      priceMin: priceRange.min.toString(),
      priceMax: priceRange.max.toString(),
      colors: [],
      sizes: [],
    };
    setFilters(updated);
    router.push(basePath);
  }

  /**
   * Verificar se há algum filtro ativo
   * (para mostrar o botão "Limpar" apenas se necessário)
   */
  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.colors.length > 0 ||
    filters.sizes.length > 0 ||
    filters.priceMin !== priceRange.min.toString() ||
    filters.priceMax !== priceRange.max.toString();

  return (
    <aside className="space-y-6">
      {/* ═════════════════════════════════════════════════════════ */}
      {/* HEADER: Título + Botão Limpar                            */}
      {/* ═════════════════════════════════════════════════════════ */}

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-plum-dark">Filtrar</h2>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-1 text-xs font-medium text-sage
                       hover:text-sage/70 transition-colors">
            <X size={16} />
            Limpar
          </button>
        )}
      </div>

      {/* ═════════════════════════════════════════════════════════ */}
      {/* SEÇÃO: Filtro de Categorias (dinâmico do Wix)           */}
      {/* ═════════════════════════════════════════════════════════ */}

      {categories.length > 0 && (
        <div className="border-t border-sand/30 pt-4">
          <details
            open
            className="group">
            <summary className="flex items-center justify-between cursor-pointer">
              <h3 className="text-sm font-semibold text-plum-dark">
                Categorias
              </h3>
              <span className="text-plum-dark/40 group-open:rotate-180 transition-transform">
                ⌄
              </span>
            </summary>

            <div className="mt-3 space-y-2">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category.id)}
                    onChange={() => toggleCategory(category.id)}
                    className="w-4 h-4 rounded border-sand accent-plum-dark
                               cursor-pointer"
                  />
                  <span className="text-sm text-plum-dark group-hover:text-sage transition-colors">
                    {category.label}
                  </span>
                  {category.count !== undefined && (
                    <span className="text-xs text-plum-dark/40">
                      ({category.count})
                    </span>
                  )}
                </label>
              ))}
            </div>
          </details>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════ */}
      {/* SEÇÃO: Filtro de Preço (dinâmico do Wix)               */}
      {/* ═════════════════════════════════════════════════════════ */}

      <div className="border-t border-sand/30 pt-4">
        <details
          open
          className="group">
          <summary className="flex items-center justify-between cursor-pointer">
            <h3 className="text-sm font-semibold text-plum-dark">
              Filtrar por Preço
            </h3>
            <span className="text-plum-dark/40 group-open:rotate-180 transition-transform">
              ⌄
            </span>
          </summary>

          <div className="mt-4 space-y-3">
            {/* Range Slider */}
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={priceRange.min}
                max={priceRange.max}
                value={filters.priceMin}
                onChange={(e) =>
                  handlePriceChange(e.target.value, filters.priceMax)
                }
                className="w-full cursor-pointer accent-sage"
              />
            </div>

            {/* Exibição de Preço */}
            <div className="text-sm text-plum-dark/70">
              Preço: R$ {filters.priceMin} - R$ {filters.priceMax}
            </div>

            {/* Inputs de Preço (opcional) */}
            <div className="flex gap-2">
              <input
                type="number"
                min={priceRange.min}
                max={priceRange.max}
                value={filters.priceMin}
                onChange={(e) =>
                  handlePriceChange(e.target.value, filters.priceMax)
                }
                className="w-1/2 px-2 py-1 text-xs border border-sand/40 rounded
                           focus:outline-none focus:border-plum-dark/30"
                placeholder="Min"
              />
              <input
                type="number"
                min={priceRange.min}
                max={priceRange.max}
                value={filters.priceMax}
                onChange={(e) =>
                  handlePriceChange(filters.priceMin, e.target.value)
                }
                className="w-1/2 px-2 py-1 text-xs border border-sand/40 rounded
                           focus:outline-none focus:border-plum-dark/30"
                placeholder="Max"
              />
            </div>
          </div>
        </details>
      </div>

      {/* ═════════════════════════════════════════════════════════ */}
      {/* SEÇÃO: Filtro de Cores (dinâmico do Wix)               */}
      {/* ═════════════════════════════════════════════════════════ */}

      {colors.length > 0 && (
        <div className="border-t border-sand/30 pt-4">
          <details
            open
            className="group">
            <summary className="flex items-center justify-between cursor-pointer">
              <h3 className="text-sm font-semibold text-plum-dark">
                Filtrar por Cor
              </h3>
              <span className="text-plum-dark/40 group-open:rotate-180 transition-transform">
                ⌄
              </span>
            </summary>

            <div className="mt-3 space-y-2.5">
              {colors.map((color) => (
                <label
                  key={color.id}
                  className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.colors.includes(color.id)}
                    onChange={() => toggleColor(color.id)}
                    className="w-4 h-4 rounded border-sand accent-plum-dark
                               cursor-pointer"
                  />

                  {/* Quadrado colorido */}
                  <div
                    className="w-4 h-4 rounded border border-sand/40"
                    style={{ backgroundColor: color.hex }}
                    title={color.label}
                  />

                  {/* Label e contagem */}
                  <span className="text-sm text-plum-dark group-hover:text-sage transition-colors">
                    {color.label}
                  </span>
                  {color.count !== undefined && (
                    <span className="text-xs text-plum-dark/40">
                      ({color.count})
                    </span>
                  )}
                </label>
              ))}
            </div>
          </details>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════ */}
      {/* SEÇÃO: Filtro de Tamanho (dinâmico do Wix)             */}
      {/* ═════════════════════════════════════════════════════════ */}

      {sizes.length > 0 && (
        <div className="border-t border-sand/30 pt-4">
          <details
            open
            className="group">
            <summary className="flex items-center justify-between cursor-pointer">
              <h3 className="text-sm font-semibold text-plum-dark">
                Filtrar por Tamanho
              </h3>
              <span className="text-plum-dark/40 group-open:rotate-180 transition-transform">
                ⌄
              </span>
            </summary>

            <div className="mt-3 space-y-2">
              {sizes.map((size) => (
                <label
                  key={size.id}
                  className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.sizes.includes(size.id)}
                    onChange={() => toggleSize(size.id)}
                    className="w-4 h-4 rounded border-sand accent-plum-dark
                               cursor-pointer"
                  />
                  <span className="text-sm text-plum-dark group-hover:text-sage transition-colors">
                    {size.label}
                  </span>
                  {size.count !== undefined && (
                    <span className="text-xs text-plum-dark/40">
                      ({size.count})
                    </span>
                  )}
                </label>
              ))}
            </div>
          </details>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════ */}
      {/* DEBUG: Mostrar estado atual (para aprender)             */}
      {/* ═════════════════════════════════════════════════════════ */}

      <details className="border-t border-sand/30 pt-4 text-xs">
        <summary className="cursor-pointer font-medium text-plum-dark/50">
          📊 Ver estado dos filtros (DEBUG)
        </summary>
        <pre className="mt-2 bg-gray-100 p-2 rounded text-[10px] overflow-auto max-h-40">
          {JSON.stringify(filters, null, 2)}
        </pre>
      </details>
    </aside>
  );
}
