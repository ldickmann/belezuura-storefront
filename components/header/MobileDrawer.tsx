/**
 * Drawer de navegação mobile
 *
 * Menu lateral com navegação principal, categorias e links da conta
 */

"use client";

import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { DrawerItem } from "@/components/ui/Drawer/DrawerItem";
import { DrawerSection } from "@/components/ui/Drawer/DrawerSection";
import {
  NAV_LINKS,
  CATEGORIES,
  ACCOUNT_LINKS,
} from "@/components/constants/navigation";
import { useNavigation } from "@/components/hooks/useNavigation";

// ─────────────────────────────────────────────────────────────
// Interfaces
// ─────────────────────────────────────────────────────────────

interface MobileDrawerProps {
  /** Se o drawer está aberto */
  isOpen: boolean;
  /** Callback ao fechar */
  onClose: () => void;
}

// ─────────────────────────────────────────────────────────────
// Componente
// ─────────────────────────────────────────────────────────────

/**
 * Drawer de navegação mobile (menu lateral esquerdo)
 */
export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const { pathname, isNavActive } = useNavigation();

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      side="left">
      {/* ───────────────────────────────────────────────────── */}
      {/* Header do Drawer */}
      {/* ───────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 h-16 border-b border-sand/20 shrink-0">
        <Image
          src="/logo/logo-belezuura-sem-fundo.jpg"
          alt="Belezuura"
          width={100}
          height={38}
          className="h-8 w-auto object-contain"
        />
        <button
          onClick={onClose}
          aria-label="Fechar menu"
          className="w-9 h-9 flex items-center justify-center rounded-full
                     bg-sand/20 text-plum-dark/50 hover:bg-sand/40 hover:text-plum-dark
                     transition-colors duration-150">
          <X size={16} />
        </button>
      </div>

      {/* ───────────────────────────────────────────────────── */}
      {/* CTAs de Conta */}
      {/* ───────────────────────────────────────────────────── */}
      <div className="flex gap-2.5 px-5 py-4 border-b border-sand/15 shrink-0">
        <Link
          href="/conta"
          onClick={onClose}
          className="flex-1 h-11 flex items-center justify-center ring-1 ring-inset ring-plum-dark/25
                     rounded-xl text-[13px] font-semibold text-plum-dark
                     hover:bg-plum-dark/5 transition-colors duration-150">
          Entrar
        </Link>
        <Link
          href="/conta"
          onClick={onClose}
          className="flex-1 h-11 flex items-center justify-center bg-plum-dark text-rose-soft
                     rounded-xl text-[13px] font-semibold
                     hover:bg-plum-dark/90 transition-colors duration-150">
          Criar conta
        </Link>
      </div>

      {/* ───────────────────────────────────────────────────── */}
      {/* Conteúdo Rolável */}
      {/* ───────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        {/* Seção: Menu Principal */}
        <DrawerSection
          title="Menu"
          className="pt-5 pb-1">
          {NAV_LINKS.map(({ label, href }) => {
            const active = isNavActive(href);
            return (
              <DrawerItem
                key={href}
                href={href}
                onClose={onClose}
                isActive={active}>
                <span
                  className={`text-[15px] tracking-[0.01em]
                              ${active ? "font-semibold text-plum-dark" : "font-medium text-plum-dark/80"}`}>
                  {label}
                </span>
              </DrawerItem>
            );
          })}

          {/* Item Especial: OUTLET */}
          <DrawerItem
            href="/outlet"
            onClose={onClose}>
            <span className="flex items-center gap-3">
              <span
                className="bg-gold-warm text-plum-dark px-2.5 py-1.25 rounded-lg
                           text-[11px] font-extrabold tracking-wide uppercase leading-none">
                OUTLET
              </span>
              <span className="text-[15px] font-medium text-plum-dark/80">
                até 60% OFF
              </span>
            </span>
          </DrawerItem>
        </DrawerSection>

        {/* Divisor */}
        <div className="mx-5 my-2 h-px bg-sand/25" />

        {/* Seção: Categorias */}
        <DrawerSection
          title="Categorias"
          className="pt-4 pb-1">
          {CATEGORIES.map(({ label, href }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <DrawerItem
                key={href}
                href={href}
                onClose={onClose}
                isActive={active}
                activeBg="bg-gold-warm/10"
                chevronActive="text-gold-warm"
                height="h-12">
                <span
                  className={`text-[14px]
                              ${active ? "font-semibold text-plum-dark" : "font-medium text-plum-dark/65"}`}>
                  {label}
                </span>
              </DrawerItem>
            );
          })}
        </DrawerSection>

        {/* Divisor */}
        <div className="mx-5 my-2 h-px bg-sand/25" />

        {/* Seção: Minha Conta */}
        <DrawerSection
          title="Minha Conta"
          className="pt-4 pb-10">
          {ACCOUNT_LINKS.map(({ label, href, Icon }) => (
            <DrawerItem
              key={href}
              href={href}
              onClose={onClose}
              height="h-12">
              <span className="flex items-center gap-3">
                <Icon
                  size={16}
                  className="text-plum-dark/40 shrink-0"
                />
                <span className="text-[14px] font-medium text-plum-dark/65">
                  {label}
                </span>
              </span>
            </DrawerItem>
          ))}
        </DrawerSection>
      </div>
    </Drawer>
  );
}
