/**
 * Barra superior promocional com ofertas rotativas
 *
 * Usa o componente RotatingBanner para alternar entre ofertas
 * com animação de flip 3D
 */

"use client";

import { RotatingBanner } from "@/components/ui/RotatingBanner";
import {
  PROMO_OFFERS,
  type PromoOffer,
} from "@/components/constants/navigation";

// ─────────────────────────────────────────────────────────────
// Componente
// ─────────────────────────────────────────────────────────────

/**
 * Barra promocional superior com ofertas rotativas
 */
export function TopBar() {
  return (
    <RotatingBanner
      items={PROMO_OFFERS}
      interval={4000}
      animationDuration={400}
      className="bg-plum-dark text-rose-soft text-[11px] sm:text-xs py-2 px-4
                 flex items-center justify-center min-h-8 overflow-hidden"
      renderItem={(offer: PromoOffer) => (
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-6 max-w-site-container">
          {/* Texto da oferta */}
          <span className="text-rose-soft/80 tracking-wide text-center leading-snug">
            {offer.text}
          </span>

          {/* Badge do cupom */}
          <span
            className="bg-gold-warm text-plum-dark font-bold tracking-widest 
                           text-[10px] px-2.5 py-0.5 rounded-full uppercase whitespace-nowrap">
            {offer.coupon}
          </span>
        </div>
      )}
    />
  );
}
