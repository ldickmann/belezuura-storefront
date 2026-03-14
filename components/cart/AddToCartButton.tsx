"use client";

import { useState, useTransition } from "react";
import { addToCart } from "@/lib/services/cart";

export function AddToCartButton({
  productId,
  disabled,
}: {
  productId: string;
  disabled?: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleClick() {
    setError(null);
    startTransition(async () => {
      try {
        await addToCart(productId, 1);
      } catch {
        setError("Nao foi possivel adicionar ao carrinho.");
      }
    });
  }

  return (
    <div className="space-y-2">
      <button
        disabled={disabled || isPending}
        onClick={handleClick}
        className="w-full h-13 flex items-center justify-center
                   bg-plum-dark text-rose-soft rounded-2xl
                   text-sm font-semibold tracking-wide
                   hover:bg-plum-dark/90 transition-colors
                   disabled:opacity-40 disabled:cursor-not-allowed">
        {isPending ? "Adicionando..." : "Adicionar a sacola"}
      </button>
      {error && (
        <p className="text-[12px] text-plum-dark/60 text-center">{error}</p>
      )}
    </div>
  );
}
