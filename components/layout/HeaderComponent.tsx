import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-sand/20">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className="text-2xl md:text-3xl text-plum-dark tracking-wide font-serif">
            Belezuura
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {["Alfaiataria", "Cosméticos", "Coleções", "Sobre"].map((item) => (
              <li key={item}>
                <Link
                  href={`/${item
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")}`}
                  className="text-plum-dark/80 hover:text-plum-dark transition-colors text-sm uppercase tracking-widest">
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <Link
              href="/carrinho"
              aria-label="Carrinho"
              className="p-2 text-plum-dark/70 hover:text-plum-dark transition-colors">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
