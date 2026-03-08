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
 * Links da navegação principal — seções do site.
 * Separados do JSX para facilitar manutenção sem tocar na marcação.
 */
const NAV_LINKS = [
  { label: "Alfaiataria", href: "/alfaiataria" },
  { label: "Cosméticos", href: "/cosmeticos" },
  { label: "Coleções", href: "/colecoes" },
  { label: "Sobre", href: "/sobre" },
];

/**
 * Todas as categorias de produto da Belezuura.
 * Exibidas na barra de categorias rolável abaixo da navegação principal.
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
  {
    text: "FRETE GRÁTIS em compras acima de R$ 299",
    coupon: "FRETEGRÁTIS",
  },
  {
    text: "10% OFF na sua primeira compra",
    coupon: "BELEZUURA10",
  },
];

/**
 * Componente TopBar
 *
 * Barra de anúncio promocional com troca animada das ofertas.
 * As promoções giram no próprio eixo X a cada 4 segundos (efeito flip-board).
 * Dispensável pelo usuário via botão de fechar.
 *
 * @param onDismiss - Callback acionado ao clicar no botão de fechar
 * @returns {JSX.Element} Barra promocional animada
 */
function TopBar({ onDismiss }: { onDismiss: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fase 1: gira para fora (rotateX 0° → 90°) com fade out
      setExiting(true);

      // Fase 2: troca conteúdo no momento invisível e gira de volta (90° → 0°)
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
      className="bg-plum-dark text-rose-soft text-xs py-2 px-4 flex items-center justify-center relative overflow-hidden"
      style={{ perspective: "600px" }}>
      {/* Conteúdo animado — flip no eixo X */}
      <div
        className="flex items-center justify-center gap-2 pr-6"
        style={{
          transition: "transform 0.4s ease, opacity 0.4s ease",
          transform: exiting ? "rotateX(90deg)" : "rotateX(0deg)",
          opacity: exiting ? 0 : 1,
          transformOrigin: "center top",
        }}>
        <span className="text-rose-soft/80 tracking-wide">{offer.text}</span>
        <span className="bg-gold-warm text-plum-dark font-bold tracking-widest text-[10px] px-2.5 py-0.5 rounded-full uppercase whitespace-nowrap">
          {offer.coupon}
        </span>
      </div>

      <button
        onClick={onDismiss}
        aria-label="Fechar aviso promocional"
        className="absolute right-4 text-rose-soft/50 hover:text-rose-soft transition-colors">
        <X size={14} />
      </button>
    </div>
  );
}

/**
 * Componente CategoriesBar
 *
 * Barra horizontal com todas as categorias de produto da Belezuura.
 * Navegável por scroll com setas de ação (↔) que aparecem
 * nas extremidades. Rota ativa destacada via usePathname.
 *
 * @param pathname - Rota atual fornecida pelo componente pai
 * @returns {JSX.Element} Barra de categorias rolável
 */
function CategoriesBar({ pathname }: { pathname: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  /** Rola a lista de categorias na direção indicada */
  function scroll(direction: "left" | "right") {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth",
    });
  }

  return (
    <div className="relative border-t border-sand/20 bg-white">
      {/* Seta de scroll — esquerda */}
      <button
        onClick={() => scroll("left")}
        aria-label="Ver categorias anteriores"
        className="absolute left-0 top-0 h-full px-2 z-10 bg-gradient-to-r from-white via-white/90 to-transparent text-plum-dark/40 hover:text-plum-dark transition-colors">
        <ChevronLeft size={15} />
      </button>

      {/* Lista horizontalmente rolável — scrollbar oculta via CSS arbitrário */}
      <div
        ref={scrollRef}
        className="flex items-center overflow-x-auto px-7 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {CATEGORIES.map(({ label, href }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`whitespace-nowrap shrink-0 px-4 py-2.5 text-[11px] uppercase tracking-wider font-medium transition-colors border-b-2 ${
                isActive
                  ? "border-plum-dark text-plum-dark"
                  : "border-transparent text-plum-dark/60 hover:text-plum-dark hover:border-sand"
              }`}>
              {label}
            </Link>
          );
        })}
      </div>

      {/* Seta de scroll — direita */}
      <button
        onClick={() => scroll("right")}
        aria-label="Ver mais categorias"
        className="absolute right-0 top-0 h-full px-2 z-10 bg-gradient-to-l from-white via-white/90 to-transparent text-plum-dark/40 hover:text-plum-dark transition-colors">
        <ChevronRight size={15} />
      </button>
    </div>
  );
}

/**
 * Componente Header
 *
 * Cabeçalho sticky do site com quatro camadas:
 * - TopBar: anúncio promocional rotativo e dispensável
 * - Main: logo + campo de busca + atalhos de conta e sacola
 * - Nav: seções principais com indicador de rota ativa
 * - CategoriesBar: todas as categorias de produto em barra rolável
 *
 * Client Component — necessário para usePathname, estados de UI
 * (menu mobile, busca expandida, TopBar) e refs de scroll.
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

      {/* Main Header: logo + busca + conta + sacola */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          {/* Hambúrguer — visível apenas no mobile */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-2 text-plum-dark/70 hover:text-plum-dark transition-colors"
            aria-label="Abrir menu">
            <Menu size={22} />
          </button>

          {/* Logo da marca */}
          <Link
            href="/"
            className="shrink-0"
            aria-label="Página inicial Belezuura">
            <Image
              src="/logo/logo-belezuura-sem-fundo.jpg"
              alt="Belezuura"
              width={140}
              height={52}
              className="object-contain"
              priority
            />
          </Link>

          {/* Campo de busca — apenas desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-6">
            <div className="flex w-full items-center border border-sand/40 rounded-full overflow-hidden bg-rose-soft/20 focus-within:border-plum-dark/40 transition-colors">
              <input
                type="search"
                placeholder="O que você procura hoje?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent px-5 py-2.5 text-sm text-plum-dark placeholder:text-plum-dark/40 focus:outline-none"
              />
              <button
                aria-label="Buscar"
                className="px-4 py-2.5 text-plum-dark/60 hover:text-plum-dark transition-colors">
                <Search size={16} />
              </button>
            </div>
          </div>

          {/* Ações da direita: busca mobile, conta e sacola */}
          <div className="flex items-center gap-1 md:gap-4">
            {/* Ícone de busca — apenas mobile */}
            <button
              onClick={() => setSearchOpen((prev) => !prev)}
              className="md:hidden p-2 text-plum-dark/70 hover:text-plum-dark transition-colors"
              aria-label="Abrir busca">
              <Search size={20} />
            </button>

            {/* Minha Conta com ícone e rótulo em duas linhas — apenas desktop */}
            <Link
              href="/conta"
              aria-label="Minha conta"
              className="hidden md:flex items-center gap-2 text-plum-dark/70 hover:text-plum-dark transition-colors group">
              <User
                size={20}
                className="shrink-0"
              />
              <span className="flex flex-col leading-tight">
                <span className="text-[10px] text-plum-dark/50 group-hover:text-plum-dark/70 transition-colors">
                  Olá! Entrar na
                </span>
                <span className="text-xs font-semibold tracking-wide">
                  Minha Conta
                </span>
              </span>
            </Link>

            {/* Sacola com ícone e rótulo (desktop) / apenas ícone (mobile) */}
            <Link
              href="/carrinho"
              aria-label="Sacola de compras"
              className="flex items-center gap-2 text-plum-dark/70 hover:text-plum-dark transition-colors group">
              <ShoppingBag
                size={20}
                className="shrink-0"
              />
              <span className="hidden md:flex flex-col leading-tight">
                <span className="text-[10px] text-plum-dark/50 group-hover:text-plum-dark/70 transition-colors">
                  Sua
                </span>
                <span className="text-xs font-semibold tracking-wide">
                  Sacola
                </span>
              </span>
            </Link>
          </div>
        </div>

        {/* Campo de busca expandido — apenas mobile, toggle via SearchOpen */}
        {searchOpen && (
          <div className="md:hidden pb-3">
            <div className="flex items-center border border-sand/40 rounded-full overflow-hidden bg-rose-soft/20 focus-within:border-plum-dark/40 transition-colors">
              <input
                type="search"
                placeholder="O que você procura hoje?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="flex-1 bg-transparent px-5 py-2.5 text-sm text-plum-dark placeholder:text-plum-dark/40 focus:outline-none"
              />
              <button
                aria-label="Buscar"
                className="px-4 py-2.5 text-plum-dark/60">
                <Search size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Barra de navegação principal — apenas desktop */}
      <nav
        aria-label="Navegação principal"
        className="hidden md:block border-t border-sand/20">
        <div className="container mx-auto px-4">
          <ul className="flex items-center">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive =
                pathname === href || pathname.startsWith(href + "/");
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    className={`block px-5 py-3 text-xs uppercase tracking-widest font-medium transition-colors border-b-2 ${
                      isActive
                        ? "border-plum-dark text-plum-dark"
                        : "border-transparent text-plum-dark/70 hover:text-plum-dark hover:border-sand"
                    }`}>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Barra de categorias de produto rolável — apenas desktop */}
      <div className="hidden md:block">
        <CategoriesBar pathname={pathname} />
      </div>

      {/* Drawer de navegação mobile */}
      {menuOpen && (
        <>
          {/* Overlay escuro com fechamento ao clicar fora */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Painel lateral deslizável */}
          <div
            role="dialog"
            aria-label="Menu de navegação"
            className="fixed top-0 left-0 h-full w-72 bg-white z-50 flex flex-col shadow-2xl">
            {/* Cabeçalho do drawer: logo + fechar */}
            <div className="flex items-center justify-between p-4 border-b border-sand/20">
              <Image
                src="/logo/logo-belezuura-sem-fundo.jpg"
                alt="Belezuura"
                width={110}
                height={42}
                className="object-contain"
              />
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Fechar menu"
                className="p-2 text-plum-dark/60 hover:text-plum-dark transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Atalho de conta — destaque no topo do drawer */}
            <Link
              href="/conta"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-6 py-4 border-b border-sand/10 bg-rose-soft/20 text-plum-dark/80 hover:bg-rose-soft/40 transition-colors">
              <User
                size={18}
                className="text-plum-dark/60"
              />
              <span className="text-sm font-medium">Entrar / Minha Conta</span>
            </Link>

            {/* Links principais */}
            <nav
              aria-label="Seções do site"
              className="py-2 border-b border-sand/10">
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
                        className={`block px-6 py-3.5 text-sm uppercase tracking-widest border-l-2 transition-colors ${
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

            {/* Categorias de produto — rolável */}
            <nav
              aria-label="Categorias de produto"
              className="flex-1 overflow-y-auto py-2">
              <p className="px-6 pt-2 pb-1 text-[10px] uppercase tracking-widest text-plum-dark/40 font-semibold">
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
                        className={`block px-6 py-3 text-sm border-l-2 transition-colors ${
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
