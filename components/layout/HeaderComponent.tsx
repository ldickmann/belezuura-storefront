"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/**
 * Links de seção principal do site.
 * Acessíveis apenas pelo drawer mobile — no desktop,
 * a CategoriesBar substitui a navegação superior.
 */
const NAV_LINKS = [
  { label: "Alfaiataria", href: "/alfaiataria" },
  { label: "Cosméticos", href: "/cosmeticos" },
  { label: "Coleções", href: "/colecoes" },
  { label: "Sobre", href: "/sobre" },
];

/**
 * Todas as categorias de produto da Belezuura.
 * Exibidas na CategoriesBar em todos os breakpoints
 * e na seção de categorias do drawer mobile.
 */
const CATEGORIES = [
  { label: "Acessórios", href: "/categoria/acessorios" },
  { label: "Cabelos", href: "/categoria/cabelos" },
  { label: "Calças", href: "/categoria/calcas" },
  { label: "Camisas", href: "/categoria/camisas" },
  { label: "Conjuntos", href: "/categoria/conjuntos" },
  { label: "Fitness", href: "/categoria/fitness" },
  { label: "Jaquetas", href: "/categoria/jaquetas" },
  { label: "Jeans", href: "/categoria/jeans" },
  { label: "Lingerie", href: "/categoria/lingerie" },
  { label: "Maquiagem", href: "/categoria/maquiagem" },
  { label: "Pele", href: "/categoria/pele" },
  { label: "Praia", href: "/categoria/praia" },
  { label: "Shorts & Saias", href: "/categoria/shorts-saias" },
  { label: "Vestidos", href: "/categoria/vestidos" },
];

/**
 * Ofertas exibidas em rotação na barra promocional superior.
 * Adicione ou remova entradas aqui sem alterar o JSX.
 */
const PROMO_OFFERS = [
  { text: "FRETE GRÁTIS em compras acima de R$ 299", coupon: "FRETEGRÁTIS" },
  { text: "10% OFF na sua primeira compra", coupon: "BELEZUURA10" },
];

/**
 * Componente TopBar
 *
 * Barra de anúncio promocional com troca animada (flip-board no eixo X).
 * Uma oferta por vez — intervalo de 4s, transição de 0.4s.
 * Dispensável via botão de fechar.
 *
 * @param onDismiss - Callback acionado ao clicar no botão fechar
 * @returns {JSX.Element} Barra promocional animada, responsiva
 */
function TopBar({ onDismiss }: { onDismiss: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fase 1: gira para fora (rotateX 0° → 90°) com fade out
      setExiting(true);
      // Fase 2: troca o conteúdo no momento invisível e gira de volta (90° → 0°)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % PROMO_OFFERS.length);
        setExiting(false);
      }, 400);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const offer = PROMO_OFFERS[currentIndex];

  return (
    <div
      className="bg-plum-dark text-rose-soft text-[11px] sm:text-xs py-2 px-4
                 flex items-center justify-center relative overflow-hidden min-h-8"
      style={{ perspective: "600px" }}>
      {/* Conteúdo animado — flip no eixo X */}
      <div
        className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-6"
        style={{
          transition: "transform 0.4s ease, opacity 0.4s ease",
          transform: exiting ? "rotateX(90deg)" : "rotateX(0deg)",
          opacity: exiting ? 0 : 1,
          transformOrigin: "center top",
        }}>
        <span className="text-rose-soft/80 tracking-wide text-center leading-snug">
          {offer.text}
        </span>
        <span
          className="bg-gold-warm text-plum-dark font-bold tracking-widest text-[10px]
                         px-2.5 py-0.5 rounded-full uppercase whitespace-nowrap">
          {offer.coupon}
        </span>
      </div>

      {/* Botão fechar — toque mínimo 44×44px */}
      <button
        onClick={onDismiss}
        aria-label="Fechar aviso promocional"
        className="absolute right-0 top-0 h-full px-3 flex items-center
                   text-rose-soft/50 hover:text-rose-soft transition-colors">
        <X size={13} />
      </button>
    </div>
  );
}

/**
 * Componente CategoriesBar
 *
 * Barra horizontal com todas as categorias de produto.
 * Visível em TODOS os breakpoints — mobile usa o scroll nativo com toque,
 * desktop usa setas clicáveis com gradiente nas bordas.
 * Rota ativa destacada via `pathname`.
 *
 * @param pathname - Rota atual fornecida pelo componente pai
 * @returns {JSX.Element} Barra de categorias rolável e acessível
 */
function CategoriesBar({ pathname }: { pathname: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -240 : 240,
      behavior: "smooth",
    });
  }

  return (
    <div className="border-t border-sand/20 bg-white">
      {/* Container centralizado — max 1280px. Overflow → setas nos extremos */}
      <div className="relative max-w-7xl mx-auto">
        {/* Seta esquerda — fica na borda esquerda do container 1280px */}
        <button
          onClick={() => scroll("left")}
          aria-label="Ver categorias anteriores"
          className="hidden sm:flex absolute left-0 top-0 h-full px-1.5 items-center z-10
                     bg-linear-to-r from-white via-white/80 to-transparent
                     text-plum-dark/40 hover:text-plum-dark transition-colors">
          <ChevronLeft size={14} />
        </button>

        {/* Lista rolável */}
        <div
          ref={scrollRef}
          className="flex items-center overflow-x-auto
                     px-2 sm:px-6
                     [&::-webkit-scrollbar]:hidden
                     [-ms-overflow-style:none]
                     [scrollbar-width:none]">
          {CATEGORIES.map(({ label, href }) => {
            const isActive =
              pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`whitespace-nowrap shrink-0
                            px-3 sm:px-4
                            py-2 sm:py-2.5
                            text-[10px] sm:text-[11px]
                            uppercase tracking-wider font-medium
                            transition-colors border-b-2
                            ${
                              isActive
                                ? "border-plum-dark text-plum-dark"
                                : "border-transparent text-plum-dark/60 hover:text-plum-dark hover:border-sand"
                            }`}>
                {label}
              </Link>
            );
          })}
        </div>

        {/* Seta direita — fica na borda direita do container 1280px */}
        <button
          onClick={() => scroll("right")}
          aria-label="Ver mais categorias"
          className="hidden sm:flex absolute right-0 top-0 h-full px-1.5 items-center z-10
                     bg-linear-to-l from-white via-white/80 to-transparent
                     text-plum-dark/40 hover:text-plum-dark transition-colors">
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

/**
 * Componente Header
 *
 * Cabeçalho sticky e totalmente responsivo com três camadas:
 * - TopBar: anúncio promocional rotativo com flip-board, dispensável
 * - Main: logo + busca (desktop) + atalhos de conta e sacola
 * - CategoriesBar: categorias de produto em barra rolável (todos os breakpoints)
 *
 * Responsividade por breakpoint:
 * - Mobile  (<768px):  [☰] [Logo] … [🔍] [🛍]  →  drawer com seções e categorias
 * - Tablet  (768px+):  [Logo] [Busca compacta] [👤] [🛍]  →  sem hamburger
 * - Desktop (1024px+): [Logo] [Busca ampla] [👤 + texto] [🛍 + texto]
 *
 * Client Component — necessário para usePathname, estados de UI
 * (menu mobile, busca expandida, TopBar) e ref de scroll.
 *
 * @returns {JSX.Element} Cabeçalho completo e responsivo do site
 */
export function Header() {
  const pathname = usePathname();
  const [showTopBar, setShowTopBar] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-sand/20 shadow-sm">
      {/* Barra promocional com flip animado */}
      {showTopBar && <TopBar onDismiss={() => setShowTopBar(false)} />}

      {/* ── Main Header ─────────────────────────────────────────────── */}
      <div className="container mx-auto px-3 sm:px-5 lg:px-8">
        <div
          className="flex items-center justify-between
                        h-14 sm:h-16 lg:h-20
                        gap-2 sm:gap-3 lg:gap-5">
          {/* Hambúrguer — apenas mobile (<768px), toque mínimo 44×44 */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
            className="md:hidden flex items-center justify-center
                       w-10 h-10 -ml-1
                       text-plum-dark/70 hover:text-plum-dark transition-colors">
            <Menu size={21} />
          </button>

          {/* Logo — centralizado no mobile via justify-between, à esquerda no desktop */}
          <Link
            href="/"
            className="shrink-0"
            aria-label="Página inicial Belezuura">
            <Image
              src="/logo/logo-belezuura-sem-fundo.jpg"
              alt="Belezuura"
              width={140}
              height={52}
              priority
              className="h-9 sm:h-10 lg:h-16 w-auto object-contain"
            />
          </Link>

          {/* Campo de busca — tablet e desktop (md+)
              compacto no tablet, amplo no desktop */}
          <div
            className="hidden md:flex flex-1 min-w-0
                          max-w-65 lg:max-w-xl
                          mx-3 lg:mx-6">
            <div
              className="flex w-full items-center
                            border border-sand/40 rounded-full overflow-hidden
                            bg-rose-soft/20 focus-within:border-plum-dark/40 transition-colors">
              <input
                type="search"
                placeholder="O que você procura hoje?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 min-w-0 bg-transparent
                           px-4 lg:px-5 py-2 lg:py-2.5
                           text-sm text-plum-dark
                           placeholder:text-plum-dark/40 focus:outline-none"
              />
              <button
                aria-label="Buscar"
                className="shrink-0 px-3 lg:px-4 py-2 lg:py-2.5
                           text-plum-dark/60 hover:text-plum-dark transition-colors">
                <Search size={15} />
              </button>
            </div>
          </div>

          {/* ── Ações direita ─────────────────────────────────────── */}
          <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2 lg:gap-4">
            {/* Busca — apenas mobile, toque mínimo 44×44 */}
            <button
              onClick={() => setSearchOpen((p) => !p)}
              aria-label="Abrir busca"
              className="md:hidden flex items-center justify-center
                         w-10 h-10
                         text-plum-dark/70 hover:text-plum-dark transition-colors">
              <Search size={19} />
            </button>

            {/* Minha Conta — tablet: só ícone | desktop: ícone + texto em 2 linhas */}
            <Link
              href="/conta"
              aria-label="Minha conta"
              className="hidden md:flex items-center gap-1.5 lg:gap-2
                         text-plum-dark/70 hover:text-plum-dark transition-colors group
                         min-w-11 min-h-11 justify-center lg:justify-start">
              <User
                size={18}
                className="shrink-0"
              />
              <span className="hidden lg:flex flex-col leading-tight">
                <span
                  className="text-[10px] text-plum-dark/50
                                 group-hover:text-plum-dark/70 transition-colors">
                  Olá! Entrar na
                </span>
                <span className="text-xs font-semibold tracking-wide">
                  Minha Conta
                </span>
              </span>
            </Link>

            {/* Sacola — mobile: só ícone | desktop: ícone + texto em 2 linhas
                toque mínimo 44×44 via padding em mobile */}
            <Link
              href="/carrinho"
              aria-label="Sacola de compras"
              className="flex items-center gap-1.5 lg:gap-2
                         text-plum-dark/70 hover:text-plum-dark transition-colors group
                         p-2 md:p-0 md:min-w-11 md:min-h-11
                         md:justify-center lg:justify-start">
              <ShoppingBag
                size={19}
                className="shrink-0"
              />
              <span className="hidden lg:flex flex-col leading-tight">
                <span
                  className="text-[10px] text-plum-dark/50
                                 group-hover:text-plum-dark/70 transition-colors">
                  Sua
                </span>
                <span className="text-xs font-semibold tracking-wide">
                  Sacola
                </span>
              </span>
            </Link>
          </div>
        </div>

        {/* Campo de busca expandido — mobile, toggle via searchOpen */}
        {searchOpen && (
          <div className="md:hidden pb-3">
            <div
              className="flex items-center border border-sand/40 rounded-full
                            overflow-hidden bg-rose-soft/20
                            focus-within:border-plum-dark/40 transition-colors">
              <input
                type="search"
                placeholder="O que você procura hoje?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="flex-1 bg-transparent px-4 py-2.5 text-sm
                           text-plum-dark placeholder:text-plum-dark/40 focus:outline-none"
              />
              <button
                aria-label="Buscar"
                className="px-3 py-2.5 text-plum-dark/60 hover:text-plum-dark transition-colors">
                <Search size={15} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Barra de Categorias — visível em TODOS os breakpoints ───── */}
      <CategoriesBar pathname={pathname} />

      {/* ── Drawer mobile ────────────────────────────────────────────── */}
      {menuOpen && (
        <>
          {/* Overlay — fecha ao clicar fora */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Painel lateral — mais largo no sm para melhor leitura */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            className="fixed top-0 left-0 h-full z-50 flex flex-col bg-white shadow-2xl
                       w-70 sm:w-80">
            {/* Cabeçalho do drawer */}
            <div
              className="flex items-center justify-between
                            px-4 py-3.5 border-b border-sand/20">
              <Image
                src="/logo/logo-belezuura-sem-fundo.jpg"
                alt="Belezuura"
                width={110}
                height={42}
                className="h-8 w-auto object-contain"
              />
              {/* Fechar — toque mínimo 44×44 */}
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Fechar menu"
                className="flex items-center justify-center w-10 h-10
                           text-plum-dark/60 hover:text-plum-dark transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Atalho de conta */}
            <Link
              href="/conta"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-5 py-3.5
                         border-b border-sand/10 bg-rose-soft/20
                         text-plum-dark/80 hover:bg-rose-soft/40 transition-colors">
              <User
                size={17}
                className="text-plum-dark/60 shrink-0"
              />
              <span className="text-sm font-medium">Entrar / Minha Conta</span>
            </Link>

            {/* Seções principais — Alfaiataria, Cosméticos… */}
            <nav
              aria-label="Seções do site"
              className="py-1 border-b border-sand/10">
              <ul>
                {NAV_LINKS.map(({ label, href }) => {
                  const isActive =
                    pathname === href || pathname.startsWith(href + "/");
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        aria-current={isActive ? "page" : undefined}
                        className={`block px-5 py-3.5 text-sm uppercase tracking-widest
                                    border-l-2 transition-colors
                                    ${
                                      isActive
                                        ? "border-plum-dark text-plum-dark font-semibold bg-rose-soft/30"
                                        : "border-transparent text-plum-dark/70 hover:text-plum-dark hover:bg-rose-soft/20"
                                    }`}>
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Categorias de produto — área rolável */}
            <nav
              aria-label="Categorias de produto"
              className="flex-1 overflow-y-auto overscroll-contain py-1">
              <p
                className="px-5 pt-3 pb-1 text-[10px] uppercase tracking-widest
                            text-plum-dark/40 font-semibold">
                Categorias
              </p>
              <ul>
                {CATEGORIES.map(({ label, href }) => {
                  const isActive =
                    pathname === href || pathname.startsWith(href + "/");
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        aria-current={isActive ? "page" : undefined}
                        className={`block px-5 py-3 text-sm border-l-2 transition-colors
                                    ${
                                      isActive
                                        ? "border-gold-warm text-plum-dark font-medium bg-gold-warm/10"
                                        : "border-transparent text-plum-dark/60 hover:text-plum-dark hover:bg-rose-soft/20"
                                    }`}>
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
