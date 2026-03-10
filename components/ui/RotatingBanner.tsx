"use client";

import { useState, useEffect, type ReactNode } from "react";

interface RotatingBannerProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  interval?: number;
  animationDuration?: number;
  className?: string;
  onDismiss?: () => void;
}

export function RotatingBanner<T>({
  items,
  renderItem,
  interval = 4000,
  animationDuration = 400,
  className = "",
  onDismiss,
}: RotatingBannerProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setExiting(true);
      setTimeout(() => {
        setCurrentIndex((i) => (i + 1) % items.length);
        setExiting(false);
      }, animationDuration);
    }, interval);

    return () => clearInterval(id);
  }, [items.length, interval, animationDuration]);

  return (
    <div
      className={`relative ${className}`}
      style={{ perspective: "600px" }}>
      <div
        style={{
          transition: `transform ${animationDuration}ms ease, opacity ${animationDuration}ms ease`,
          transform: exiting ? "rotateX(90deg)" : "rotateX(0deg)",
          opacity: exiting ? 0 : 1,
          transformOrigin: "center top",
        }}>
        {renderItem(items[currentIndex])}
      </div>

      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Fechar banner"
          className="absolute right-0 top-0 h-full px-3">
          ✕
        </button>
      )}
    </div>
  );
}
