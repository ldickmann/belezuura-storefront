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
  Heart,
  Package,
  HelpCircle,
} from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Loja", href: "/loja" },
  { label: "Alfaiataria", href: "/alfaiataria" },
  { label: "Maquiagem", href: "/maquiagem" },
  { label: "Cosméticos", href: "/cosmeticos" },
];

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

const PROMO_OFFERS = [
  { text: "FRETE GRÁTIS em compras acima de R$ 299", coupon: "FRETEGRÁTIS" },
  { text: "10% OFF na sua primeira compra", coupon: "BELEZUURA10" },
];

const ACCOUNT_LINKS = [
  { label: "Meus Pedidos", href: "/pedidos", Icon: Package },
  { label: "Favoritos", href: "/favoritos", Icon: Heart },
  { label: "Precisa de ajuda?", href: "/ajuda", Icon: HelpCircle },
];

// ─────────────────────────────────────────────────────────────────────────────

function TopBar({ onDismiss }: { onDismiss: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setExiting(true);
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
        <span className="bg-gold-warm text-plum-dark font-bold tracking-widest text-[10px] px-2.5 py-0.5 rounded-full uppercase whitespace-nowrap">
          {offer.coupon}
        </span>
      </div>
      <button
        onClick={onDismiss}
        aria-label="Fechar aviso promocional"
        className="absolute right-0 top-0 h-full px-3 flex items-center text-rose-soft/50 hover:text-rose-soft transition-colors">
        <X size={13} />
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Componente CategoriesBar
 *
 * Mega menu de categorias — visualmente separado do header principal
 * por sombra direcional + fundo levemente tintado (sand/rose-soft).
 * Comunica ao usuário que é uma camada de navegação distinta.
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
    <div
      className="bg-white"
      style={{
        /* Sombra interna no topo (sublinha o border) + sombra para baixo (profundidade) */
        boxShadow:
          "inset 0 1px 0 rgba(211,171,145,0.45), 0 4px 14px -4px rgba(72,56,76,0.10)",
        borderTop: "1px solid rgba(211,171,145,0.30)",
      }}>
      <div className="relative max-w-7xl mx-auto">
        {/* Seta esquerda */}
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
          className="flex items-center overflow-x-auto px-2 sm:px-6
                     [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
        </div>

        {/* Seta direita */}
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

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Componente Header
 *
 * Layout inspirado no print — TUDO em uma única barra horizontal:
 *   [☰]  [Logo]  [Busca]  [Home · Loja · Alfaiataria · Maquiagem · Cosméticos]  [👤  🛍]
 *
 * E abaixo, o mega menu de categorias — visualmente separado por sombra e border.
 *
 * Mobile  (<768px):  [☰] [Logo] → → → [🔍] [🛍]
 * Tablet  (768-1023px): [Logo] [Busca] → → → [👤] [🛍]   (nav no drawer)
 * Desktop (1024px+): [Logo] [Busca] [Nav inline] [👤 🛍]
 */
export function Header() {
  const pathname = usePathname();
  const [showTopBar, setShowTopBar] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white">
      {showTopBar && <TopBar onDismiss={() => setShowTopBar(false)} />}

      {/* ═══════════════════════════════════════════════════════════════
          Barra principal — logo · busca · nav · ícones numa única linha
          Separada do mega menu por border-b mais pronunciada
      ═══════════════════════════════════════════════════════════════ */}
      <div
        className="bg-white"
        style={{ borderBottom: "1px solid rgba(211,171,145,0.25)" }}>
        <div className="container mx-auto px-3 sm:px-5 lg:px-8">
          {/* ── Linha principal — items-stretch para border-b dos nav tabs ── */}
          <div className="flex items-stretch h-14 lg:h-16 gap-2 sm:gap-3 lg:gap-4">
            {/* Hambúrguer — mobile only */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-drawer"
              className="md:hidden self-center flex items-center justify-center
                         w-10 h-10 -ml-1 text-plum-dark/70 hover:text-plum-dark transition-colors">
              <Menu size={21} />
            </button>

            {/* Logo — menor, alinhado ao centro vertical */}
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

            {/* ── Centro: busca + nav links (md+) ─────────────────────── */}
            <div className="hidden md:flex flex-1 items-stretch min-w-0 gap-0">
              {/* Input de busca — menor, centralizado verticalmente */}
              <div className="self-center w-full max-w-60 lg:max-w-85 mr-2 lg:mr-4 shrink-0">
                <div
                  className="flex items-center border border-sand/35 rounded-full
                             overflow-hidden bg-rose-soft/15
                             focus-within:border-plum-dark/35 transition-colors">
                  <input
                    type="search"
                    placeholder="O que você procura?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 min-w-0 bg-transparent px-3.5 py-2.5
                               text-[13px] text-plum-dark
                               placeholder:text-plum-dark/35 focus:outline-none"
                  />
                  <button
                    aria-label="Buscar"
                    className="shrink-0 px-3 py-2.5 text-plum-dark/45 hover:text-plum-dark transition-colors">
                    <Search size={14} />
                  </button>
                </div>
              </div>

              {/* Nav links — desktop (lg+), alinhados à base do header via self-stretch
                  O border-b-2 activo "encosta" na base da barra, criando tab indicator */}
              <nav
                aria-label="Navegação principal"
                className="hidden lg:flex items-stretch">
                {NAV_LINKS.map(({ label, href }) => {
                  const isActive =
                    href === "/"
                      ? pathname === "/"
                      : pathname === href || pathname.startsWith(href + "/");
                  return (
                    <Link
                      key={href}
                      href={href}
                      aria-current={isActive ? "page" : undefined}
                      className={`self-stretch flex items-center px-3.5 xl:px-4
                                  text-[13px] font-medium tracking-wide whitespace-nowrap
                                  transition-colors border-b-2
                                  ${
                                    isActive
                                      ? "border-plum-dark text-plum-dark"
                                      : "border-transparent text-plum-dark/60 hover:text-plum-dark hover:border-sand/70"
                                  }`}>
                      {label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* ── Ícones — sempre visíveis, agrupados à direita ──────── */}
            <div className="flex items-center gap-0.5 lg:gap-1 ml-auto md:ml-0 shrink-0">
              {/* Busca — apenas mobile */}
              <button
                onClick={() => setSearchOpen((p) => !p)}
                aria-label="Abrir busca"
                className="md:hidden flex items-center justify-center w-10 h-10
                           text-plum-dark/70 hover:text-plum-dark transition-colors">
                <Search size={19} />
              </button>

              {/* Ícone de conta */}
              <Link
                href="/conta"
                aria-label="Minha conta"
                className="hidden md:flex items-center gap-1.5
                           text-plum-dark/65 hover:text-plum-dark transition-colors group
                           px-2.5 h-full">
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

              {/* Ícone de sacola */}
              <Link
                href="/carrinho"
                aria-label="Sacola de compras"
                className="flex items-center gap-1.5
                           text-plum-dark/65 hover:text-plum-dark transition-colors group
                           px-2 md:px-2.5 h-full">
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

          {/* Busca expandida — mobile */}
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
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          Mega menu de categorias
          Shadow própria + border diferenciado → claramente outra seção
      ═══════════════════════════════════════════════════════════════ */}
      <CategoriesBar pathname={pathname} />

      {/* ── Overlay ───────────────────────────────────────────────── */}
      <div
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]
                    transition-opacity duration-300
                    ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* ── Drawer mobile ─────────────────────────────────────────── */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        className={`fixed top-0 left-0 h-full z-50 flex flex-col bg-white
                    w-[300px] sm:w-[340px]
                    shadow-[4px_0_40px_-8px_rgba(0,0,0,0.18)]
                    transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
                    ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Cabeçalho do drawer */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-sand/20 shrink-0">
          <Image
            src="/logo/logo-belezuura-sem-fundo.jpg"
            alt="Belezuura"
            width={100}
            height={38}
            className="h-8 w-auto object-contain"
          />
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
            className="w-9 h-9 flex items-center justify-center rounded-full
                       bg-sand/20 text-plum-dark/50
                       hover:bg-sand/40 hover:text-plum-dark transition-colors duration-150">
            <X size={16} />
          </button>
        </div>

        {/* Botões CTA */}
        <div className="flex gap-2.5 px-5 py-4 border-b border-sand/15 shrink-0">
          <Link
            href="/conta/entrar"
            onClick={() => setMenuOpen(false)}
            className="flex-1 h-11 flex items-center justify-center
                       ring-1 ring-inset ring-plum-dark/25 rounded-xl
                       text-[13px] font-semibold text-plum-dark
                       hover:bg-plum-dark/5 transition-colors duration-150">
            Entrar
          </Link>
          <Link
            href="/conta/criar"
            onClick={() => setMenuOpen(false)}
            className="flex-1 h-11 flex items-center justify-center
                       bg-plum-dark text-rose-soft rounded-xl
                       text-[13px] font-semibold
                       hover:bg-plum-dark/90 transition-colors duration-150">
            Criar conta
          </Link>
        </div>

        {/* Conteúdo rolável */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {/* Menu principal */}
          <div className="pt-5 pb-1">
            <p className="px-5 pb-2.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-plum-dark/35">
              Menu
            </p>
            <ul className="divide-y divide-sand/10">
              {NAV_LINKS.map(({ label, href }) => {
                const isActive =
                  href === "/"
                    ? pathname === "/"
                    : pathname === href || pathname.startsWith(href + "/");
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center justify-between px-5 h-14
                                  transition-colors duration-150 group
                                  ${isActive ? "bg-plum-dark/[0.04]" : "hover:bg-sand/20"}`}>
                      <span
                        className={`text-[15px] tracking-[0.01em]
                                        ${isActive ? "font-semibold text-plum-dark" : "font-medium text-plum-dark/80"}`}>
                        {label}
                      </span>
                      <ChevronRight
                        size={15}
                        className={`shrink-0 transition-transform duration-150 group-hover:translate-x-0.5
                                    ${isActive ? "text-plum-dark/50" : "text-plum-dark/20"}`}
                      />
                    </Link>
                  </li>
                );
              })}

              {/* Outlet destaque */}
              <li>
                <Link
                  href="/outlet"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-5 h-14
                             hover:bg-sand/20 transition-colors duration-150 group">
                  <span className="flex items-center gap-3">
                    <span
                      className="bg-gold-warm text-plum-dark px-2.5 py-[5px] rounded-lg
                                     text-[11px] font-extrabold tracking-wide uppercase leading-none">
                      OUTLET
                    </span>
                    <span className="text-[15px] font-medium text-plum-dark/80">
                      até 60% OFF
                    </span>
                  </span>
                  <ChevronRight
                    size={15}
                    className="shrink-0 text-plum-dark/20 transition-transform duration-150 group-hover:translate-x-0.5"
                  />
                </Link>
              </li>
            </ul>
          </div>

          <div className="mx-5 my-2 h-px bg-sand/25" />

          {/* Categorias */}
          <div className="pt-4 pb-1">
            <p className="px-5 pb-2.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-plum-dark/35">
              Categorias
            </p>
            <ul className="divide-y divide-sand/10">
              {CATEGORIES.map(({ label, href }) => {
                const isActive =
                  pathname === href || pathname.startsWith(href + "/");
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center justify-between px-5 h-12
                                  transition-colors duration-150 group
                                  ${isActive ? "bg-gold-warm/10" : "hover:bg-sand/20"}`}>
                      <span
                        className={`text-[14px]
                                        ${isActive ? "font-semibold text-plum-dark" : "font-medium text-plum-dark/65"}`}>
                        {label}
                      </span>
                      <ChevronRight
                        size={14}
                        className={`shrink-0 transition-transform duration-150 group-hover:translate-x-0.5
                                    ${isActive ? "text-gold-warm" : "text-plum-dark/20"}`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mx-5 my-2 h-px bg-sand/25" />

          {/* Minha Conta */}
          <div className="pt-4 pb-10">
            <p className="px-5 pb-2.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-plum-dark/35">
              Minha Conta
            </p>
            <ul className="divide-y divide-sand/10">
              {ACCOUNT_LINKS.map(({ label, href, Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between px-5 h-12
                               hover:bg-sand/20 transition-colors duration-150 group">
                    <span className="flex items-center gap-3">
                      <Icon
                        size={16}
                        className="text-plum-dark/40 shrink-0"
                      />
                      <span className="text-[14px] font-medium text-plum-dark/65">
                        {label}
                      </span>
                    </span>
                    <ChevronRight
                      size={14}
                      className="shrink-0 text-plum-dark/20 transition-transform duration-150 group-hover:translate-x-0.5"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
