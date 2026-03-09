import { usePathname } from 'next/navigation';

/**
 * Hook customizado para gerenciar navegação e estado ativo de rotas.
 * 
 * Fornece utilidades para verificar se uma rota está ativa com base no pathname atual.
 * 
 * @returns {Object} Objeto contendo pathname atual e função helper de navegação
 * @returns {string} pathname - O pathname atual da rota
 * @returns {Function} isNavActive - Função que verifica se uma rota está ativa
 * 
 * @example
 * const { pathname, isNavActive } = useNavigation();
 * 
 * // Verifica se a rota "/produtos" está ativa
 * const isActive = isNavActive('/produtos');
 */
export function useNavigation() {
  const pathname = usePathname();

  /**
   * Verifica se uma rota específica está ativa.
   * 
   * - Para a rota raiz ('/'), retorna true apenas se o pathname for exatamente '/'
   * - Para outras rotas, retorna true se o pathname for igual ou começar com o href
   * 
   * @param {string} href - O caminho da rota a ser verificado
   * @returns {boolean} true se a rota está ativa, false caso contrário
   */
  const isNavActive = (href: string): boolean => {
    // Tratamento especial para a página inicial
    if (href === '/') return pathname === '/';

    // Verifica correspondência exata ou se é uma sub-rota
    return pathname === href || pathname.startsWith(href + '/');
  };

  return { pathname, isNavActive };
}