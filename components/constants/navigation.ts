/**
 * Constantes de navegação e configuração do site
 * 
 * Centralizadas aqui para facilitar manutenção e reutilização
 * em múltiplos componentes (Header, Footer, Sitemap, etc)
 */

import { Package, Heart, HelpCircle, type LucideIcon } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// Interfaces
// ─────────────────────────────────────────────────────────────

/** Link de navegação básico */
export interface NavLink {
  label: string;
  href: string;
}

/** Link de categoria (idêntico ao NavLink, mas mantido para semântica) */
export type CategoryLink = NavLink;

/** Link de conta com ícone associado */
export interface AccountLink extends NavLink {
  Icon: LucideIcon;
}

/** Oferta promocional para o banner rotativo */
export interface PromoOffer {
  text: string;
  coupon: string;
}

// ─────────────────────────────────────────────────────────────
// Navegação Principal
// ─────────────────────────────────────────────────────────────

/** Links do menu principal (desktop e mobile) */
export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Loja", href: "/loja" },
  { label: "Alfaiataria", href: "/alfaiataria" },
  { label: "Maquiagem", href: "/maquiagem" },
  { label: "Cosméticos", href: "/cosmeticos" },
];

// ─────────────────────────────────────────────────────────────
// Categorias de Produtos
// ─────────────────────────────────────────────────────────────

/** Categorias exibidas na barra horizontal do header */
export const CATEGORIES: CategoryLink[] = [
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

// ─────────────────────────────────────────────────────────────
// Promoções e Ofertas
// ─────────────────────────────────────────────────────────────

/** Ofertas exibidas no banner rotativo superior */
export const PROMO_OFFERS: PromoOffer[] = [
  {
    text: "FRETE GRÁTIS em compras acima de R$ 299",
    coupon: "FRETEGRÁTIS"
  },
  {
    text: "10% OFF na sua primeira compra",
    coupon: "BELEZUURA10"
  },
];

// ─────────────────────────────────────────────────────────────
// Links da Conta
// ─────────────────────────────────────────────────────────────

/** Links da seção "Minha Conta" no drawer mobile */
export const ACCOUNT_LINKS: AccountLink[] = [
  { label: "Meus Pedidos", href: "/pedidos", Icon: Package },
  { label: "Favoritos", href: "/favoritos", Icon: Heart },
  { label: "Precisa de ajuda?", href: "/ajuda", Icon: HelpCircle },
];