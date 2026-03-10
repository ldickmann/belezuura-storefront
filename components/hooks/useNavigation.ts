import { usePathname } from 'next/navigation';

export function useNavigation() {
  const pathname = usePathname();

  const isNavActive = (href: string): boolean => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return { pathname, isNavActive };
}