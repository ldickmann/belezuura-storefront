import { useEffect } from 'react';

export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => {
      document.body.style.overflow = original;
    };
  }, [locked]);
}