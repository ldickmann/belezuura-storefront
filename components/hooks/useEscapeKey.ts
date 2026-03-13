import { useEffect } from 'react';

/**
 * Hook customizado para detectar e responder à tecla Escape.
 * 
 * Útil para fechar modais, drawers ou outros componentes overlay quando o usuário
 * pressiona a tecla Escape.
 * 
 * @param {Function} onEscape - Callback executado quando a tecla Escape é pressionada
 * @param {boolean} [enabled=true] - Flag para habilitar/desabilitar o listener (padrão: true)
 * 
 * @example
 * // Fechar modal ao pressionar Escape
 * useEscapeKey(() => setIsOpen(false), isOpen);
 * 
 * @example
 * // Sempre habilitado
 * useEscapeKey(() => handleClose());
 */
export function useEscapeKey(
  onEscape: () => void,
  enabled: boolean = true
) {
  useEffect(() => {
    // Se o hook estiver desabilitado, não adiciona o listener
    if (!enabled) return;

    /**
     * Handler do evento de teclado.
     * Verifica se a tecla pressionada foi Escape e executa o callback.
     */
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onEscape();
    };

    // Adiciona o event listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup: remove o listener quando o componente desmontar ou as dependências mudarem
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onEscape, enabled]);
}