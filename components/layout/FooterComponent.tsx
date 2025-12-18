import Link from "next/link";

/**
 * Componente Footer
 *
 * Rodapé do site com:
 * - Informações da marca
 * - Links de navegação
 * - Formulário de newsletter
 * - Copyright
 *
 * @returns {JSX.Element} Rodapé do site
 */
export function Footer() {
  return (
    <footer className="bg-plum-dark text-rose-soft">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coluna 1: Informações da Marca */}
          <div>
            <h3 className="text-2xl mb-4 text-gold-warm font-serif">
              Belezuura
            </h3>
            <p className="text-rose-soft/70 text-sm">
              Elegância atemporal para mulheres que valorizam sofisticação.
            </p>
          </div>

          {/* Coluna 2: Links de Navegação */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2 text-sm text-rose-soft/70">
              <li>
                <Link
                  href="/alfaiataria"
                  className="hover:text-gold-warm">
                  Alfaiataria
                </Link>
              </li>
              <li>
                <Link
                  href="/cosmeticos"
                  className="hover:text-gold-warm">
                  Cosméticos
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="hover:text-gold-warm">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Newsletter */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">
              Newsletter
            </h4>
            {/* Formulário de Inscrição */}
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="seu@email.com"
                className="flex-1 px-3 py-2 bg-white/10 border border-rose-soft/20 rounded text-sm"
              />
              <button className="px-4 py-2 bg-gold-warm text-plum-dark text-sm font-medium rounded">
                Enviar
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-rose-soft/10 text-center text-sm text-rose-soft/50">
          © {new Date().getFullYear()} Belezuura. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
