"use client";

import { useState, useEffect, type ReactNode } from "react";

interface RotatingBannerProps<T> {
  /** Lista de itens para exibir no banner rotativo */
  items: T[];
  /** Função que define como renderizar cada item */
  renderItem: (item: T) => ReactNode;
  /** Tempo em ms entre cada rotação (padrão: 4000) */
  interval?: number;
  /** Duração da animação em ms (padrão: 400) */
  animationDuration?: number;
  /** Classes CSS personalizadas */
  className?: string;
}

/**
 * Banner rotativo com animação 3D que alterna entre itens automaticamente.
 *
 * Usa efeito de flip (rotateX) para transição entre itens.
 * Opcional: botão X para fechar o banner.
 *
 * @example
 * <RotatingBanner
 *   items={['Frete grátis', '20% OFF', 'Novidades']}
 *   renderItem={(text) => <p>{text}</p>}
 *   interval={3000}
 * />
 */
export function RotatingBanner<T>({
  items,
  renderItem,
  interval = 4000,
  animationDuration = 400,
  className = "",
}: RotatingBannerProps<T>) {
  // Índice do item atualmente exibido
  const [currentIndex, setCurrentIndex] = useState(0);
  // Controla se o item está saindo (animação de saída)
  const [exiting, setExiting] = useState(false);

  // Configurar rotação automática
  useEffect(() => {
    const id = setInterval(() => {
      // Inicia animação de saída
      setExiting(true);

      // Após a animação, troca o item e remove o estado de saída
      setTimeout(() => {
        setCurrentIndex((i) => (i + 1) % items.length); // Volta ao início após o último
        setExiting(false);
      }, animationDuration);
    }, interval);

    // Limpar intervalo ao desmontar
    return () => clearInterval(id);
  }, [items.length, interval, animationDuration]);

  return (
    <div
      className={`relative ${className}`}
      style={{ perspective: "600px" }}>
      {" "}
      {/* Perspectiva 3D */}
      {/* Item atual com animação */}
      <div
        style={{
          transition: `transform ${animationDuration}ms ease, opacity ${animationDuration}ms ease`,
          transform: exiting ? "rotateX(90deg)" : "rotateX(0deg)", // Flip 3D
          opacity: exiting ? 0 : 1, // Fade out/in
          transformOrigin: "center top",
        }}>
        {renderItem(items[currentIndex])}
      </div>
    </div>
  );
}
