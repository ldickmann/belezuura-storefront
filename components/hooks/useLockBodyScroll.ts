import { useEffect } from 'react';

/**
 * Hook customizado para bloquear/desbloquear o scroll do body.
 * 
 * Útil quando modais, drawers ou overlays estão abertos e você deseja prevenir
 * que o usuário role a página de fundo. O hook preserva e restaura o valor
 * original da propriedade overflow.
 * 
 * @param {boolean} locked - Se true, bloqueia o scroll; se false, libera o scroll
 * 
 * @example
 * // Bloquear scroll quando o drawer está aberto
 * const [isOpen, setIsOpen] = useState(false);
 * useLockBodyScroll(isOpen);
 * 
 * @example
 * // Sempre bloqueado enquanto o componente estiver montado
 * useLockBodyScroll(true);
 */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    // Salva o valor original do overflow para restaurar depois
    const original = document.body.style.overflow;

    // Define overflow como 'hidden' (bloqueado) ou vazio (desbloqueado)
    document.body.style.overflow = locked ? 'hidden' : '';

    // Cleanup: restaura o valor original quando o componente desmontar
    // ou quando o estado 'locked' mudar
    return () => {
      document.body.style.overflow = original;
    };
  }, [locked]);
}